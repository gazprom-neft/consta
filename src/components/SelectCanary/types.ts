import React from 'react';

import {
  FieldPropForm,
  FieldPropSize,
  FieldPropStatus,
  FieldPropView,
} from '##/components/FieldComponents';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type RenderItemProps<ITEM> = {
  item: ITEM;
  active: boolean;
  hovered: boolean;
  onClick: (e: React.MouseEvent) => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  ref: React.Ref<HTMLDivElement>;
};

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
type ComboboxPropSearch<ITEM> =
  | ((item: ITEM, searchValue: string) => boolean)
  | boolean;
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
) => React.ReactNode | null;

export type ComboboxPropRenderValue<ITEM, MULTIPLE> = (
  value: MULTIPLE extends true ? ITEM[] : ITEM,
) => React.ReactNode | null;

export type ComboboxPropOnCreate = (
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
    form?: FieldPropForm;
    dropdownForm?: 'default' | 'brick' | 'round';
    size?: FieldPropSize;
    view?: FieldPropView;
    placeholder?: string;
    ariaLabel?: string;
    status?: FieldPropStatus;
    isLoading?: boolean;
    dropdownClassName?: string;
    dropdownRef?: React.Ref<HTMLDivElement>;
    name?: string;
    renderItem?: ComboboxPropRenderItem<ITEM>;
    renderValue?: ComboboxPropRenderValue<ITEM, MULTIPLE>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: ComboboxPropOnCreate;
    inputRef?: React.Ref<HTMLInputElement>;
    labelForNotFound?: string;
    labelForCreate?:
      | ((label: string | undefined) => React.ReactNode)
      | React.ReactNode;
    labelForEmptyItems?: string;
    search?: ComboboxPropSearch<ITEM>;
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
    virtualScroll?: boolean;
    onScrollToBottom?: (length: number) => void;
    onSearchValueChange?: (value: string) => void;
    onDropdownOpen?: (isOpen: boolean) => void;
    dropdownOpen?: boolean;
    ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
    clearButton?: boolean;
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
