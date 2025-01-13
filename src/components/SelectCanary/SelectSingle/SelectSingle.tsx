import React, { forwardRef, useCallback, useRef } from 'react';

import {
  FieldSelectControlLayout,
  FieldSelectInput,
} from '##/components/FieldComponents';
import {
  defaultLabelForEmptyItems,
  defaultLabelForNotFound,
} from '##/components/SelectComponentsCanary/helpers';
import { SelectDropdown } from '##/components/SelectComponentsCanary/SelectDropdown';
import { SelectItem } from '##/components/SelectComponentsCanary/SelectItem';
import { useSelect } from '##/components/SelectComponentsCanary/useSelect';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';
import { cnCanary as cn } from '##/utils/bem';

import {
  ComboboxComponent,
  ComboboxGroupDefault,
  ComboboxItemDefault,
  ComboboxPropRenderItem,
  ComboboxPropRenderValue,
  ComboboxProps,
} from '..';
import { withDefaultGetters } from '../helpers';

const cnSelectSingle = cn('SelectSelectSingleMultiple');

const SelectSingleRender = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
>(
  props: ComboboxProps<ITEM, GROUP, false>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    form = 'default',
    status,
    size = 'm',
    disabled,
    multiple = false,
    value,
    getItemLabel,
    renderValue,
    items,
    groups,
    onChange,
    getItemKey,
    getItemGroupKey,
    getGroupKey,
    onFocus,
    search,
    isLoading,
    onDropdownOpen,
    dropdownOpen,
    ignoreOutsideClicksRefs,
    selectAll,
    searchValue: searchValueProp,
    getItemDisabled,
    onBlur,
    onSearchValueChange,
    onCreate,
    dropdownRef: dropdownRefProp,
    dropdownForm = 'default',
    dropdownClassName,
    renderItem,
    getGroupLabel,
    labelForNotFound = defaultLabelForNotFound,
    labelForCreate,
    labelForEmptyItems = defaultLabelForEmptyItems,
    virtualScroll,
    onScrollToBottom,
    style,
    className,
    placeholder,
    view,
    clearButton,
  } = withDefaultGetters(props);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const mutableRefs = useMutableRef([
    getItemLabel,
    size,
    dropdownForm,
    getItemDisabled,
  ] as const);

  const renderValueDefault: ComboboxPropRenderValue<ITEM, false> = useCallback(
    (value) => mutableRefs.current[0](value),
    [],
  );

  const renderItemDefault: ComboboxPropRenderItem<ITEM> = useCallback(
    ({ item, active, hovered, onClick, onMouseEnter, ref }) => {
      return (
        <SelectItem
          label={mutableRefs.current[0](item)}
          active={active}
          hovered={hovered}
          size={mutableRefs.current[1]}
          indent={mutableRefs.current[2] === 'round' ? 'increased' : 'normal'}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          disabled={mutableRefs.current[3](item)}
          ref={ref}
        />
      );
    },
    [],
  );

  const {
    getOptionProps,
    isOpen,
    visibleItems,
    isFocused,
    handleInputFocus,
    handleInputBlur,
    handleToggleDropdown,
    inputRef,
    handleInputClick,
    handleInputChange,
    searchValue,
    clearValue,
    notFound,
    hasItems,
    optionsRefs,
  } = useSelect<ITEM, GROUP, false>({
    items,
    groups,
    value,
    onChange,
    selectAll,
    dropdownRef,
    controlRef,
    disabled,
    getItemLabel,
    getItemKey,
    getGroupKey,
    searchValue: searchValueProp,
    getItemGroupKey,
    getItemDisabled,
    multiple,
    onBlur,
    onFocus,
    onCreate,
    search,
    onDropdownOpen,
    onSearchValueChange,
    dropdownOpen,
    ignoreOutsideClicksRefs,
    clearButton,
  });

  return (
    <>
      <FieldSelectControlLayout
        style={style}
        ref={useForkRef([ref, controlRef])}
        className={cnSelectSingle(null, [className])}
        form={form}
        status={status}
        size={size}
        disabled={disabled}
        separator
        onClear={clearValue}
        onDropdownButton={handleToggleDropdown}
        open={isOpen}
        focused={isFocused}
        view={view}
      >
        <FieldSelectInput
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          onClick={handleInputClick}
          onChange={search ? handleInputChange : undefined}
          value={search ? searchValue : undefined}
          readOnly={search ? undefined : true}
          disabled={disabled}
          placeholder={placeholder}
        >
          {value && (renderValue || renderValueDefault)(value)}
        </FieldSelectInput>
      </FieldSelectControlLayout>
      <SelectDropdown
        isOpen={isOpen}
        size={size}
        controlRef={controlRef}
        getOptionProps={getOptionProps}
        dropdownRef={useForkRef([dropdownRef, dropdownRefProp])}
        form={dropdownForm}
        className={dropdownClassName}
        renderItem={renderItem || renderItemDefault}
        getGroupLabel={getGroupLabel}
        visibleItems={visibleItems}
        labelForNotFound={labelForNotFound}
        labelForCreate={labelForCreate}
        isLoading={isLoading}
        labelForEmptyItems={labelForEmptyItems}
        notFound={notFound}
        hasItems={hasItems}
        itemsRefs={optionsRefs}
        virtualScroll={virtualScroll}
        onScrollToBottom={onScrollToBottom}
        style={
          typeof style?.zIndex === 'number'
            ? { zIndex: style.zIndex + 1 }
            : undefined
        }
      />
    </>
  );
};

export const SelectSingle = forwardRef(SelectSingleRender) as ComboboxComponent;
