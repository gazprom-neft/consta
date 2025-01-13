import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from '##/hooks/useClickOutside';
import { useDebounce } from '##/hooks/useDebounce';
import { KeyHandlers, useKeysRef } from '##/hooks/useKeysRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { usePrevious } from '##/hooks/usePrevious';
import { useRefs } from '##/hooks/useRefs';
import {
  CountedGroup,
  getCountedGroups,
  getGroups,
  SelectAllItem,
} from '##/utils/getGroups';

import { scrollToIndex, useHoistedState } from './helpers';

type IndexForHighlight = number | ((oldIndex: number) => number);

type Group<ITEM, GROUP> = {
  items: ITEM[];
  key: string | number;
  group?: GROUP;
};
type GetItemGroupKey<ITEM> = (item: ITEM) => string | number | undefined;
type GetGroupKey<GROUP> = (item: GROUP) => string | number | undefined;
type SortGroups<ITEM, GROUP> = (
  a: Group<ITEM, GROUP>,
  b: Group<ITEM, GROUP>,
) => number;

type OnChangeProp<ITEM, MULTIPLE extends boolean> = (
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null,
  props: {
    e: React.SyntheticEvent;
  },
) => void;

type ValueProp<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type OptionForCreate = {
  label: string;
  __optionForCreate: boolean;
};

export type SelectProps<ITEM, GROUP, MULTIPLE extends boolean> = {
  getItemGroupKey?: GetItemGroupKey<ITEM> | undefined;
  getGroupKey?: GetGroupKey<GROUP>;
  sortGroups?: SortGroups<ITEM, GROUP>;
  groups?: GROUP[];
  items: ITEM[];
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  disabled?: boolean;
  selectAll?: boolean;
  getItemLabel: (item: ITEM) => string;
  getItemKey: (item: ITEM) => string | number;
  getItemDisabled?: (item: ITEM) => boolean | undefined;
  search?: ((item: ITEM, searchValue: string) => boolean) | boolean;
  onCreate?: (
    label: string,
    props: { e: React.SyntheticEvent; label: string },
  ) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  multiple: boolean;
  searchValue?: string;
  onChange: OnChangeProp<ITEM, MULTIPLE>;
  value: ValueProp<ITEM, MULTIPLE>;
  dropdownOpen?: boolean;
  onDropdownOpen?: (isOpen: boolean) => void;
  onSearchValueChange?: (value: string) => void;
  ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
  clearButton?: boolean;
};

export type OptionProps<ITEM> = {
  index: number;
  item: ITEM | OptionForCreate | SelectAllItem;
  keyPrefix: string | number;
};

export type GetOptionPropsResult = {
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  active: boolean;
  hovered: boolean;
  key: string | number;
};

const isMultipleParams = <ITEM, GROUP>(
  params: SelectProps<ITEM, GROUP, boolean>,
): params is SelectProps<ITEM, GROUP, true> => {
  return params.multiple;
};

const isNotMultipleParams = <ITEM, GROUP>(
  params: SelectProps<ITEM, GROUP, boolean>,
): params is SelectProps<ITEM, GROUP, false> => {
  return !params.multiple;
};

const actions = {
  setOpen: 'setOpen',
  setSearch: 'setSearch',
  highlightIndex: 'highlightIndex',
};

const initialState = {
  searchValue: '',
  resolvedSearchValue: '',
  isOpen: false,
  highlightedIndex: 0,
  scrollToHighlighted: false,
};

export const isOptionForCreate = <ITEM, GROUP>(
  params: OptionForCreate | Group<ITEM, GROUP> | ITEM,
): params is OptionForCreate => {
  return (
    params && Object.prototype.hasOwnProperty.call(params, '__optionForCreate')
  );
};

export const isNotOptionForCreate = <ITEM, GROUP>(
  params: OptionForCreate | Group<ITEM, GROUP>,
): params is Group<ITEM, GROUP> => {
  return (
    params && !Object.prototype.hasOwnProperty.call(params, '__optionForCreate')
  );
};

export const isOptionForSelectAll = <ITEM>(
  params: SelectAllItem | ITEM,
): params is SelectAllItem => {
  return (
    params && Object.prototype.hasOwnProperty.call(params, '__optionSelectAll')
  );
};

export function useSelect<ITEM, GROUP, MULTIPLE extends boolean>(
  params: SelectProps<ITEM, GROUP, MULTIPLE>,
) {
  const {
    items,
    dropdownRef,
    controlRef,
    disabled = false,
    multiple = false,
    getItemLabel,
    getItemKey,
    search = true,
    getItemGroupKey,
    groups,
    selectAll = false,
    getGroupKey,
    sortGroups,
    getItemDisabled,
    onFocus,
    onBlur,
    searchValue: searchValueProp,
    onDropdownOpen,
    onSearchValueChange,
    dropdownOpen,
    ignoreOutsideClicksRefs,
    clearButton,
  } = params;

  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const value = useMemo(
    () =>
      (params.value &&
        (Array.isArray(params.value) ? params.value : [params.value])) ||
      [],
    [params.value],
  );

  const [
    {
      searchValue,
      isOpen,
      highlightedIndex,
      resolvedSearchValue,
      scrollToHighlighted,
    },
    setState,
  ] = useHoistedState(initialState);

  const onSearchValueChangeRef = useMutableRef(onSearchValueChange);

  const searchFunctionDefault = (item: ITEM, searchValue: string) =>
    getItemLabel(item)
      .toLocaleLowerCase()
      .indexOf(searchValue.toLocaleLowerCase()) !== -1;

  const [filteredOptions, optionForCreate] = useMemo(() => {
    const optionForCreate: OptionForCreate = {
      label: searchValue,
      __optionForCreate: true,
    };

    if (resolvedSearchValue && resolvedSearchValue !== '') {
      const filteredOptions = items.filter((item) => {
        if (typeof search === 'function') {
          return search(item, resolvedSearchValue);
        }

        if (search) {
          return searchFunctionDefault(item, resolvedSearchValue);
        }

        return true;
      });

      return [
        filteredOptions,
        params.onCreate ? optionForCreate : undefined,
      ] as const;
    }

    return [items, params.onCreate ? optionForCreate : undefined] as const;
  }, [items, resolvedSearchValue, params.onCreate]);

  const visibleItems = useMemo(() => {
    const resultGroups = getCountedGroups(
      getGroups(
        filteredOptions,
        groups?.length ? getItemGroupKey : undefined,
        groups,
        getGroupKey,
        sortGroups,
      ),
      isMultipleParams(params) ? params.value : [],
      selectAll,
      getItemKey,
      getItemDisabled,
    );

    return optionForCreate ? [optionForCreate, ...resultGroups] : resultGroups;
  }, [
    value,
    selectAll,
    filteredOptions,
    groups,
    getItemGroupKey,
    getItemDisabled,
    getGroupKey,
    sortGroups,
    optionForCreate,
  ]);

  const maxHighlightIndex =
    // количество опций
    filteredOptions.length +
    // кнопка для создания
    (optionForCreate ? 1 : 0) +
    // кнопки выбрать все
    (selectAll ? visibleItems.length : 0);

  const optionsRefs = useRefs<HTMLDivElement>(maxHighlightIndex, [isOpen]);

  const notFound = useMemo(() => {
    let flag = false;
    if (searchValue.length > 0) {
      flag =
        visibleItems.filter(
          (group) =>
            isOptionForCreate(group) || group.items.length > 0 || group.group,
        ).length === 0 && !params.onCreate;
    }
    return flag;
  }, [visibleItems]);

  const hasItems = items.length !== 0;

  const allItemsSelected = useMemo(() => {
    if (isNotMultipleParams(params)) {
      return false;
    }
    if (selectAll) {
      return (
        items.filter((el) =>
          value.find((item) => getItemKey(item) === getItemKey(el)),
        ).length === items.length
      );
    }

    return false;
  }, [selectAll, multiple, value, items]);

  const getSelectedOptionIndex = (): number => {
    let index = 0;
    if (value.length > 0) {
      for (const group of visibleItems) {
        if (isOptionForCreate(group)) {
          index++;
          // eslint-disable-next-line no-continue
          continue;
        }
        for (const item of group.items) {
          if (isOptionForSelectAll(item)) {
            return index;
          }
          if (getItemKey(item) === getItemKey(value[0])) {
            return index;
          }
          index++;
        }
      }
    }

    return 0;
  };

  // Actions

  const setOpen = useCallback(
    (newIsOpen: boolean) => {
      setState(
        (old) => ({
          ...old,
          isOpen: newIsOpen,
        }),
        actions.setOpen,
      );
    },
    [setState],
  );

  const setResolvedSearch = useDebounce((value: string) => {
    setState((old) => {
      if (old.resolvedSearchValue === value) {
        return old;
      }
      return {
        ...old,
        resolvedSearchValue: value,
      };
    }, actions.setSearch);
  }, 300);

  const setSearch = useCallback(
    (value: string | undefined) => {
      setState((old) => {
        if (old.searchValue === value) {
          return old;
        }
        return {
          ...old,
          searchValue: value || '',
        };
      }, actions.setSearch);
      setResolvedSearch(value || '');
    },
    [setState, setResolvedSearch],
  );

  const prevIsOpen = usePrevious(isOpen);

  const highlightIndex = useCallback(
    (indexForHighlight: IndexForHighlight, scrollToHighlighted: boolean) => {
      setState((old) => {
        const newIndex = Math.min(
          Math.max(
            0,
            typeof indexForHighlight === 'function'
              ? indexForHighlight(old.highlightedIndex)
              : indexForHighlight,
          ),
          maxHighlightIndex - 1,
        );

        if (old.highlightedIndex === newIndex) {
          return old;
        }

        return {
          ...old,
          highlightedIndex: newIndex,
          scrollToHighlighted,
        };
      }, actions.highlightIndex);
    },
    [filteredOptions, setState, optionForCreate],
  );

  useLayoutEffect(() => {
    if (value !== null && !prevIsOpen && isOpen) {
      const currentHighlightIndex = getSelectedOptionIndex();
      if (filteredOptions.length > 0) {
        scrollToIndex(currentHighlightIndex, dropdownRef, optionsRefs, () =>
          highlightIndex(0, false),
        );
      }
    }
  });

  const removeValue = (e: React.SyntheticEvent, valueItem: ITEM) => {
    e.stopPropagation();
    if (isMultipleParams(params)) {
      const newValue = params.value?.filter(
        (item) => getItemKey(item) !== getItemKey(valueItem),
      );
      const val = newValue?.length ? newValue : null;
      params.onChange(val, {
        e,
      });
    }
  };

  const onChange = (e: React.SyntheticEvent, item: ITEM) => {
    if (getItemDisabled && getItemDisabled(item)) {
      return;
    }
    if (isMultipleParams(params)) {
      const newValue = value.some(
        (value) => getItemKey(value) === getItemKey(item),
      )
        ? value.filter((value) => getItemKey(value) !== getItemKey(item))
        : [...value, item];
      const val = newValue?.length ? newValue : null;
      params.onChange(val, { e });
    }
    if (isNotMultipleParams(params)) {
      params.onChange(item, { e });
      setOpen(false);
      setSearch('');
    }
  };

  const onChangeAll = (parametrs: {
    e: React.SyntheticEvent;
    items: ITEM[];
  }) => {
    const { e, items } = parametrs;
    if (isMultipleParams(params)) {
      const nonDisabledItems = getItemDisabled
        ? items.filter((item) => !getItemDisabled(item))
        : items;

      const currentGroupValues: ITEM[] = [];
      const withoutGroupValues: ITEM[] = [];
      value.forEach((el) => {
        if (
          nonDisabledItems.find((item) => getItemKey(el) === getItemKey(item))
        ) {
          currentGroupValues.push(el);
        } else {
          withoutGroupValues.push(el);
        }
      });
      if (currentGroupValues.length === nonDisabledItems.length) {
        params.onChange(withoutGroupValues, { e });
      } else {
        const val = [...withoutGroupValues, ...nonDisabledItems];
        params.onChange(val, {
          e,
        });
      }
    }
  };

  const onCreate = (e: React.SyntheticEvent, label: string) => {
    params.onCreate && params.onCreate(label, { e, label });
    setOpen(false);
    setSearch('');
  };

  // Handlers

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!disabled && !(!multiple && value.length > 0)) {
      setSearch(e.target.value);
      setOpen(true);
    }
  };

  const handleInputClick = (): void => {
    !disabled && setOpen(!isOpen);

    if (multiple) {
      inputRef.current?.focus();
    }
  };

  const clearValue =
    clearButton && (value?.length || searchValue)
      ? (e: React.SyntheticEvent) => {
          if (isMultipleParams(params)) {
            const results = value?.filter((item) => getItemDisabled?.(item));
            const val = results && results.length > 0 ? results : null;
            params.onChange(val, {
              e,
            });
          }
          if (isNotMultipleParams(params)) {
            params.onChange(null, { e });
          }
          setSearch('');
        }
      : undefined;

  const getHandleRemoveValue = (item: ITEM) => (e: React.SyntheticEvent) =>
    removeValue(e, item);

  // Prop Getters

  const ArrowUp = (e: KeyboardEvent) => {
    e.preventDefault();
    !disabled && setOpen(true);
    highlightIndex((old) => old - 1, true);
  };

  const ArrowDown = (e: KeyboardEvent) => {
    e.preventDefault();
    !disabled && setOpen(true);
    highlightIndex((old) => old + 1, true);
  };

  const Enter = (e: React.SyntheticEvent) => {
    if (isOpen) {
      if (searchValue || filteredOptions[highlightedIndex]) {
        e.preventDefault();
      }

      const getData = (
        index: number,
      ): [
        CountedGroup<ITEM, GROUP> | undefined,
        SelectAllItem | OptionForCreate | ITEM | undefined,
      ] => {
        let counter = 0;
        for (const group of visibleItems) {
          if (isOptionForCreate(group)) {
            counter++;
            return [undefined, group];
          }
          if (group.items.length + counter > index) {
            return [group, group.items[index - counter]];
          }
          counter += group.items.length;
        }
        return [undefined, undefined];
      };

      const [group, item] = getData(highlightedIndex);

      if (isOptionForCreate(item)) {
        onCreate(e, item.label);
        return;
      }

      if (isOptionForSelectAll(item)) {
        onChangeAll({
          e,
          items:
            (group?.items.filter(
              (el) => !isOptionForSelectAll(el),
            ) as ITEM[]) ?? [],
        });
        return;
      }

      if (item) {
        onChange(e, item);
      }
    } else {
      setOpen(true);
    }
  };

  const Escape = () => {
    setOpen(false);
  };

  const Tab = (e: KeyboardEvent) => {
    if (isOpen) {
      e.preventDefault();
      setOpen(false);
    }
  };

  const Backspace = (e: React.SyntheticEvent) => {
    if (searchValue) {
      return;
    }
    if (multiple) {
      removeValue(e, value[value.length - 1]);
    } else {
      clearValue?.(e);
    }
  };

  const getOptionProps = ({
    index,
    item,
    keyPrefix,
  }: OptionProps<ITEM>): GetOptionPropsResult => {
    if (isOptionForCreate(item)) {
      return {
        onClick: (e: React.SyntheticEvent) => {
          onCreate(e, item.label);
        },
        onMouseEnter: () => {
          highlightIndex(index, false);
        },
        active: false,
        hovered: index === highlightedIndex,
        key: `${keyPrefix}__optionForCreate`,
      };
    }
    if (isOptionForSelectAll(item)) {
      const getItems = (): ITEM[] => {
        for (const group of visibleItems) {
          if (isOptionForCreate(group)) {
            break;
          }
          if (group.key === item.groupKey) {
            return (
              (group?.items.filter(
                (el) => !isOptionForSelectAll(el),
              ) as ITEM[]) ?? []
            );
          }
        }
        return [];
      };
      return {
        onClick: (e: React.SyntheticEvent) => {
          onChangeAll({ e, items: getItems() });
        },
        onMouseEnter: () => {
          highlightIndex(index, false);
        },
        active: false,
        hovered: index === highlightedIndex,
        key: `${keyPrefix}__optionForSelectAll`,
      };
    }
    const key = getItemKey(item);
    return {
      onClick: (e: React.SyntheticEvent) => {
        onChange(e, item);
      },
      onMouseEnter: () => {
        highlightIndex(index, false);
      },
      active: Boolean(value.find((item) => getItemKey(item) === key)),
      hovered: index === highlightedIndex,
      key: `${keyPrefix}${key}`,
    };
  };

  const keys = {
    ArrowUp,
    ArrowDown,
    PageUp: ArrowUp,
    PageDown: ArrowDown,
    Home: ArrowUp,
    End: ArrowDown,
    Enter,
    Escape,
    Tab,
    Backspace,
  };

  useKeysRef({
    keys: keys as unknown as KeyHandlers,
    ref: inputRef,
    isActive: !disabled,
    // eventHandler: (e) => console.log(e),
  });

  useClickOutside({
    isActive: isOpen,
    ignoreClicksInsideRefs: [
      dropdownRef,
      controlRef,
      ...(ignoreOutsideClicksRefs || []),
    ],
    handler: () => {
      setOpen(false);
    },
  });

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  useEffect(() => {
    const currentHighlightIndex = getSelectedOptionIndex();
    highlightIndex(currentHighlightIndex, true);
  }, [highlightIndex]);

  useEffect(() => {
    if (filteredOptions.length > 0 && scrollToHighlighted) {
      scrollToIndex(highlightedIndex, dropdownRef, optionsRefs, () =>
        highlightIndex(0, false),
      );
    }
  }, [highlightedIndex]);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (!disabled) {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (typeof onFocus === 'function') {
        onFocus(e);
      }
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
    if (isOpen) {
      inputRef.current?.focus();
      return;
    }

    if (isFocused) {
      setIsFocused(false);
    }

    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  const handleToggleDropdown = (): void => {
    if (isOpen) {
      setOpen(false);
      setIsFocused(false);
    } else {
      setOpen(true);
      setIsFocused(true);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    setSearch(searchValueProp);
  }, [searchValueProp]);

  useEffect(() => {
    dropdownRef.current?.scrollTo({ top: 0 });
  }, [resolvedSearchValue]);

  useEffect(() => {
    onDropdownOpen?.(isOpen);
  }, [isOpen]);

  useEffect(() => {
    onSearchValueChangeRef.current?.(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setOpen(dropdownOpen || false);
  }, [dropdownOpen]);

  return {
    isOpen,
    isFocused,
    highlightedIndex,
    visibleItems,
    highlightIndex,
    getOptionProps,
    handleInputFocus,
    handleInputBlur,
    handleToggleDropdown,
    handleInputClick,
    inputRef,
    handleInputChange,
    searchValue,
    clearValue,
    getHandleRemoveValue,
    notFound,
    hasItems,
    allItemsSelected,
    optionsRefs,
  };
}
