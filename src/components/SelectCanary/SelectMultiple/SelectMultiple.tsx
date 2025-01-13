import './SelectMultiple.css';

import React, { forwardRef, useCallback, useMemo, useRef } from 'react';

import {
  FieldArrayValueInlineControl,
  FieldArrayValueItem,
  FieldSelectControlLayout,
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
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
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

const cnSelectMultiple = cn('SelectMultiple');

const SelectMultipleRender = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
>(
  props: ComboboxProps<ITEM, GROUP, true>,
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
    searchFunction,
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
  } = withDefaultGetters(props);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const mutableRefs = useMutableRef([
    getItemLabel,
    size,
    dropdownForm,
    getItemDisabled,
  ] as const);

  const renderValueDefault: ComboboxPropRenderValue<ITEM, true> = (value) =>
    value.map((item) => {
      return (
        <FieldArrayValueItem
          key={getItemKey(item)}
          size={size}
          label={getItemLabel(item)}
          disabled={disabled}
          onRemove={() => {}}
        />
      );
    });

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
          multiple
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
  } = useSelect<ITEM, GROUP, true>({
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
    searchFunction,
    onDropdownOpen,
    onSearchValueChange,
    dropdownOpen,
    ignoreOutsideClicksRefs,
  });

  return (
    <>
      <FieldSelectControlLayout
        style={style}
        ref={useForkRef([ref, controlRef])}
        className={cnSelectMultiple(
          { withValue: !!value?.length || !!searchValue },
          [className],
        )}
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
        alignSlots="center"
      >
        <FieldArrayValueInlineControl
          className={cnSelectMultiple('Value', [
            cnMixScrollBar({ size: 'xs', trackSize: 'auto' }),
          ])}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          onClick={handleInputClick}
          onChange={handleInputChange}
          value={value || undefined}
          disabled={disabled}
          placeholder={placeholder}
          renderValue={renderValue || renderValueDefault}
          size={size}
        />
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

export const SelectMultiple = forwardRef(
  SelectMultipleRender,
) as ComboboxComponent;
