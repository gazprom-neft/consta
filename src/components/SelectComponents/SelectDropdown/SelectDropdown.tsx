import './SelectDropdown.css';

import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import { Transition } from 'react-transition-group';

import {
  cnListBox,
  ListItem,
  ListLoader,
  mapVerticalSpace,
} from '##/components/ListCanary';
import { Popover, PopoverPropOffset } from '##/components/Popover';
import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';
import { forkRef, useForkRef } from '##/hooks/useForkRef';
import { useVirtualScroll } from '##/hooks/useVirtualScroll';
import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '##/mixs/MixPopoverAnimate/MixPopoverAnimate';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';
import { fabricIndex } from '##/utils/fabricIndex';
import { SelectAllItem } from '##/utils/getGroups';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import { SelectGroupLabel } from '../SelectGroupLabel/SelectGroupLabel';
import { SelectItemAll } from '../SelectItemAll/SelectItemAll';
import { SelectLoader } from '../SelectLoader/SelectLoader';
import { PropSize, RenderItemProps } from '../types';
import {
  GetOptionPropsResult,
  isNotOptionForCreate,
  isOptionForCreate,
  isOptionForSelectAll,
  OptionForCreate,
  OptionProps,
} from '../useSelect';

export const selectDropdownForm = ['default', 'brick', 'round'] as const;
export type SelectDropdownPropForm = typeof selectDropdownForm[number];
export const defaultSelectDropdownPropForm = selectDropdownForm[0];

type Props<ITEM, GROUP> = PropsWithJsxAttributes<{
  size: PropSize;
  controlRef: React.MutableRefObject<HTMLDivElement | null>;
  dropdownRef: React.Ref<HTMLDivElement>;
  getOptionProps(props: OptionProps<ITEM>): GetOptionPropsResult;
  form: SelectDropdownPropForm;
  isOpen: boolean;
  offset?: PopoverPropOffset | 'none';
  isLoading?: boolean;
  renderItem: (props: RenderItemProps<ITEM>) => JSX.Element | null;
  visibleItems: (
    | OptionForCreate
    | {
        items: Array<SelectAllItem | ITEM>;
        key: string | number;
        group?: GROUP;
        groupIndex: number;
        checkedCount?: number;
        totalCount?: number;
      }
  )[];
  getGroupLabel?: (group: GROUP) => string;
  labelForCreate?: string;
  labelForNotFound?: string;
  labelForEmptyItems?: string;
  notFound?: boolean;
  hasItems?: boolean;
  itemsRefs: React.RefObject<HTMLDivElement>[];
  virtualScroll?: boolean;
  onScrollToBottom?: (length: number) => void;
}>;

type SelectDropdownComponent = <ITEM, GROUP>(
  props: Props<ITEM, GROUP>,
) => React.ReactElement | null;

const cnSelectDropdown = cn('SelectDropdown');

const getLengthElements = <ITEM, GROUP>(
  elements: (
    | OptionForCreate
    | {
        items: Array<SelectAllItem | ITEM>;
        key: string | number;
        group?: GROUP;
        groupIndex: number;
        checkedCount?: number;
        totalCount?: number;
      }
  )[],
) => {
  let length = elements.length <= 1 ? 0 : elements.length;

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];

    if (isNotOptionForCreate(element) && element.items.length) {
      length += element.items.length;
    }
  }

  return length;
};

const isVisible = (slice: [number, number], index: number) => {
  return index >= slice[0] && index < slice[1];
};

export const SelectDropdown: SelectDropdownComponent = (props) => {
  const {
    controlRef,
    size,
    getOptionProps,
    dropdownRef: dropdownRefProp,
    labelForCreate,
    className,
    labelForNotFound,
    labelForEmptyItems,
    hasItems = true,
    form,
    isOpen,
    offset: offsetProp = 'none',
    renderItem,
    visibleItems,
    isLoading,
    getGroupLabel,
    notFound,
    itemsRefs,
    virtualScroll,
    onScrollToBottom,
    ...otherProps
  } = props;

  const indent = form === 'round' ? 'increased' : 'normal';

  const isListShowed = useMemo(() => {
    return (
      visibleItems.filter(
        (group) =>
          isOptionForCreate(group) ||
          (Array.isArray(group.items) && group.items.length > 0),
      ).length > 0
    );
  }, [visibleItems]);

  const offset = offsetProp === 'none' ? undefined : offsetProp;

  const lengthForVirtualScroll = useMemo(
    () => getLengthElements(visibleItems),
    [visibleItems],
  );

  const {
    spaceTop,
    slice: sliceHookProp,
    listRefs,
    scrollElementRef,
  } = useVirtualScroll({
    length: lengthForVirtualScroll,
    isActive: virtualScroll && isOpen,
    onScrollToBottom,
  });

  const slice: [number, number] =
    sliceHookProp[0] === 0 && virtualScroll ? [0, 50] : sliceHookProp;

  const popoverRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useForkRef([scrollElementRef, dropdownRefProp]);
  const [scrolled, setScrolled] = useFlag();
  const setScrolledOffDebounce = useDebounce(setScrolled.off, 100);

  useEffect(() => {
    const fn = () => {
      setScrolled.on();
      setScrolledOffDebounce();
    };

    scrollElementRef.current?.addEventListener('scroll', fn);

    return () => {
      scrollElementRef.current?.removeEventListener('scroll', fn);
    };
  }, [scrollElementRef.current]);

  return (
    <Transition
      in={isOpen}
      unmountOnExit
      nodeRef={popoverRef}
      timeout={animateTimeout}
    >
      {(animate) => {
        const getIndex = fabricIndex();
        const getVirtualIndex = fabricIndex();

        return (
          <Popover
            {...otherProps}
            anchorRef={controlRef}
            direction="downStartLeft"
            possibleDirections={[
              'downStartLeft',
              'upStartLeft',
              'downStartRight',
              'upStartRight',
            ]}
            offset={offset}
            ref={popoverRef}
            role="listbox"
            className={cnSelectDropdown(null, [
              cnListBox({ size, form, border: true, shadow: true }),
              cnMixPopoverAnimate({ animate }),
              className,
            ])}
            equalAnchorWidth
          >
            <div
              className={cnSelectDropdown('ScrollContainer', [
                cnMixSpace({
                  pV: mapVerticalSpace[size],
                }),
                cnMixScrollBar(),
              ])}
              ref={dropdownRef}
            >
              {isLoading && !isListShowed && <SelectLoader />}
              <div
                className={cnSelectDropdown('List', { scrolled })}
                style={{ marginTop: spaceTop }}
              >
                {visibleItems.map((group, groupIndex) => {
                  if (isOptionForCreate(group)) {
                    const index = getIndex();
                    return (
                      <SelectCreateButton
                        size={size}
                        labelForCreate={labelForCreate}
                        inputValue={group.label}
                        indent={indent}
                        ref={itemsRefs[index]}
                        {...getOptionProps({
                          index,
                          item: group,
                          keyPrefix: groupIndex,
                        })}
                      />
                    );
                  }

                  const virtualIndex =
                    visibleItems.length > 1 ? getVirtualIndex() : 0;

                  return (
                    <Fragment key={group.key}>
                      {group.group &&
                        getGroupLabel &&
                        isVisible(slice, virtualIndex) && (
                          <SelectGroupLabel
                            label={getGroupLabel(group.group)}
                            size={size}
                            indent={indent}
                            ref={listRefs[virtualIndex]}
                            key={`group-${group.key}`}
                          />
                        )}
                      {group.items.map((item, i) => {
                        if (isOptionForSelectAll(item)) {
                          const virtualIndex = getVirtualIndex();
                          const index = getIndex();

                          if (isVisible(slice, virtualIndex)) {
                            return (
                              <SelectItemAll
                                ref={forkRef([
                                  listRefs[virtualIndex],
                                  itemsRefs[index],
                                ])}
                                indent={indent}
                                size={size}
                                {...getOptionProps({
                                  index,
                                  item,
                                  keyPrefix: i,
                                })}
                                intermediate={
                                  item.checkedCount && item.totalCount
                                    ? item.checkedCount !== item.totalCount
                                    : false
                                }
                                checked={item.checkedCount === item.totalCount}
                                countItems={item.checkedCount}
                                total={item.totalCount}
                              />
                            );
                          }
                        } else {
                          const virtualIndex = getVirtualIndex();
                          const index = getIndex();
                          if (isVisible(slice, virtualIndex)) {
                            return (
                              <Fragment key={`${group.key}-${i}`}>
                                {renderItem({
                                  ref: forkRef([
                                    listRefs[virtualIndex],
                                    itemsRefs[index],
                                  ]),
                                  item,
                                  ...getOptionProps({
                                    index,
                                    item,
                                    keyPrefix: i,
                                  }),
                                })}
                              </Fragment>
                            );
                          }
                        }
                      })}
                    </Fragment>
                  );
                })}
                {isLoading && isListShowed && (
                  <ListLoader size={size} innerOffset={indent} />
                )}
              </div>
              {!isLoading && hasItems && notFound && labelForNotFound && (
                <ListItem
                  size={size}
                  label={labelForNotFound}
                  innerOffset={indent}
                >
                  {labelForNotFound}
                </ListItem>
              )}
              {!isLoading && !hasItems && labelForEmptyItems && (
                <ListItem
                  size={size}
                  label={labelForEmptyItems}
                  innerOffset={indent}
                >
                  {labelForEmptyItems}
                </ListItem>
              )}
            </div>
          </Popover>
        );
      }}
    </Transition>
  );
};
