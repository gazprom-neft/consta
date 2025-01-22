import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import {
  PropForm,
  PropSize,
  PropStatus,
  PropView,
  RenderItemProps,
} from '##/components/SelectComponents/types';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type ComboboxItemDefault = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type ComboboxGroupDefault = {
  label: string;
  id: string | number;
};

type RenderValueProps<ITEM> = {
  item: ITEM;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export type ComboboxPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type ComboboxPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type ComboboxPropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type ComboboxPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type ComboboxPropGetGroupKey<GROUP> = (group: GROUP) => string | number;
export type ComboboxPropGetGroupLabel<GROUP> = (group: GROUP) => string;
type ComboboxPropSearchFunction<ITEM> = (
  item: ITEM,
  searchValue: string,
) => boolean;
type ComboboxPropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null,
  props: {
    e: React.SyntheticEvent;
  },
) => void;
type ComboboxPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type ComboboxPropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactElement | null;
export type ComboboxPropRenderValue<ITEM> = (
  props: RenderValueProps<ITEM>,
) => React.ReactElement | null;

type ComboboxPropOnCreate = (
  label: string,
  props: { e: React.SyntheticEvent },
) => void;

export type ComboboxProps<
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: ComboboxPropOnChange<ITEM, MULTIPLE>;
    disabled?: boolean;
    form?: PropForm;
    dropdownForm?: 'default' | 'brick' | 'round';
    size?: PropSize;
    view?: PropView;
    placeholder?: string;
    ariaLabel?: string;
    status?: PropStatus;
    isLoading?: boolean;
    dropdownClassName?: string;
    dropdownRef?: React.Ref<HTMLDivElement>;
    name?: string;
    renderItem?: ComboboxPropRenderItem<ITEM>;
    renderValue?: ComboboxPropRenderValue<ITEM>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: ComboboxPropOnCreate;
    inputRef?: React.Ref<HTMLInputElement>;
    labelForNotFound?: string;
    required?: boolean;
    labelForCreate?: string;
    labelForEmptyItems?: string;
    searchFunction?: ComboboxPropSearchFunction<ITEM>;
    searchValue?: string;
    multiple?: MULTIPLE;
    value?: ComboboxPropValue<ITEM, MULTIPLE>;
    groups?: GROUP[];
    getItemLabel?: ComboboxPropGetItemLabel<ITEM>;
    getItemKey?: ComboboxPropGetItemKey<ITEM>;
    getItemGroupKey?: ComboboxPropGetItemGroupKey<ITEM>;
    getItemDisabled?: ComboboxPropGetItemDisabled<ITEM>;
    getGroupLabel?: ComboboxPropGetGroupLabel<GROUP>;
    getGroupKey?: ComboboxPropGetGroupKey<GROUP>;
    label?: string;
    labelIcon?: IconComponent;
    caption?: string;
    labelPosition?: 'top' | 'left';
    virtualScroll?: boolean;
    onScrollToBottom?: (length: number) => void;
    onSearchValueChange?: (value: string) => void;
    onDropdownOpen?: (isOpen: boolean) => void;
    dropdownOpen?: boolean;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
    searchDebounceDelay?: number;
  },
  HTMLDivElement
> &
  (MULTIPLE extends true
    ? {
        selectAll?: boolean;
        allSelectedAllLabel?: string;
      }
    : {
        selectAll?: never;
        allSelectedAllLabel?: never;
      }) &
  (ITEM extends { label: ComboboxItemDefault['label'] }
    ? {}
    : { getItemLabel: ComboboxPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: ComboboxItemDefault['id'] }
    ? {}
    : { getItemKey: ComboboxPropGetItemKey<ITEM> }) &
  (GROUP extends { label: ComboboxGroupDefault['label'] }
    ? {}
    : { getGroupLabel: ComboboxPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: ComboboxGroupDefault['id'] }
    ? {}
    : { getGroupKey: ComboboxPropGetGroupKey<GROUP> });

export type ComboboxComponent = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: ComboboxProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactElement | null;

export const defaultGetItemKey: ComboboxPropGetItemKey<ComboboxItemDefault> = (
  item,
) => item.id;
export const defaultGetItemLabel: ComboboxPropGetItemLabel<
  ComboboxItemDefault
> = (item) => item.label;
export const defaultGetItemGroupKey: ComboboxPropGetItemGroupKey<
  ComboboxItemDefault
> = (item) => item.groupId;
export const defaultGetItemDisabled: ComboboxPropGetItemDisabled<
  ComboboxItemDefault
> = (item) => item.disabled;

export const defaultGetGroupKey: ComboboxPropGetGroupKey<
  ComboboxGroupDefault
> = (group) => group.id;
export const defaultGetGroupLabel: ComboboxPropGetGroupLabel<
  ComboboxGroupDefault
> = (group) => group.label;

export const isMultipleParams = <ITEM, GROUP>(
  params: ComboboxProps<ITEM, GROUP, boolean>,
): params is ComboboxProps<ITEM, GROUP, true> => {
  return !!params.multiple;
};

export const isNotMultipleParams = <ITEM, GROUP>(
  params: ComboboxProps<ITEM, GROUP, boolean>,
): params is ComboboxProps<ITEM, GROUP, false> => {
  return !params.multiple;
};

export function withDefaultGetters<
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
>(props: ComboboxProps<ITEM, GROUP, MULTIPLE>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemGroupKey: props.getItemGroupKey || defaultGetItemGroupKey,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisabled,
    getGroupLabel: props.getGroupLabel || defaultGetGroupLabel,
    getGroupKey: props.getGroupKey || defaultGetGroupKey,
  };
}

export const clearSizeMap: Record<PropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

export const iconSizeMap: Record<PropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};
