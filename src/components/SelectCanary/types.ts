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

export type SelectItemDefault = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
};

export type SelectGroupDefault = {
  label: string;
  id: string | number;
};

export type SelectPropGetItemLabel<ITEM> = (item: ITEM) => string;
export type SelectPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type SelectPropGetItemGroupKey<ITEM> = (
  item: ITEM,
) => string | number | undefined;
export type SelectPropGetItemDisabled<ITEM> = (
  item: ITEM,
) => boolean | undefined;
export type SelectPropGetGroupKey<GROUP> = (group: GROUP) => string | number;
export type SelectPropGetGroupLabel<GROUP> = (group: GROUP) => string;
type SelectPropSearch<ITEM> =
  | ((item: ITEM, searchValue: string) => boolean)
  | boolean;
type SelectPropOnChange<ITEM, MULTIPLE extends boolean> = (
  value: (MULTIPLE extends true ? ITEM[] : ITEM) | null,
  props: {
    e: React.SyntheticEvent;
  },
) => void;
type SelectPropValue<ITEM, MULTIPLE extends boolean> =
  | (MULTIPLE extends true ? ITEM[] : ITEM)
  | null
  | undefined;

export type SelectPropRenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactNode | null;

export type SelectPropRenderValue<ITEM, MULTIPLE> = MULTIPLE extends true
  ? (props: {
      value: ITEM[];
      getRemove: (
        item: ITEM,
      ) => (e: React.SyntheticEvent<Element, Event>) => void;
    }) => React.ReactNode | null
  : (props: { value: ITEM }) => React.ReactNode | null;

export type SelectPropOnCreate = (
  label: string,
  props: { e: React.SyntheticEvent },
) => void;

export type SelectProps<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
> = PropsWithHTMLAttributesAndRef<
  {
    items: ITEM[];
    onChange: SelectPropOnChange<ITEM, MULTIPLE>;
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
    renderItem?: SelectPropRenderItem<ITEM>;
    renderValue?: SelectPropRenderValue<ITEM, MULTIPLE>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onCreate?: SelectPropOnCreate;
    inputRef?: React.Ref<HTMLInputElement>;
    labelForNotFound?: string;
    labelForCreate?:
      | ((label: string | undefined) => React.ReactNode)
      | React.ReactNode;
    labelForEmptyItems?: string;
    search?: SelectPropSearch<ITEM>;
    searchValue?: string;
    multiple?: MULTIPLE;
    value?: SelectPropValue<ITEM, MULTIPLE>;
    groups?: GROUP[];
    getItemLabel?: SelectPropGetItemLabel<ITEM>;
    getItemKey?: SelectPropGetItemKey<ITEM>;
    getItemGroupKey?: SelectPropGetItemGroupKey<ITEM>;
    getItemDisabled?: SelectPropGetItemDisabled<ITEM>;
    getGroupLabel?: SelectPropGetGroupLabel<GROUP>;
    getGroupKey?: SelectPropGetGroupKey<GROUP>;
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
  (ITEM extends { label: SelectItemDefault['label'] }
    ? {}
    : { getItemLabel: SelectPropGetItemLabel<ITEM> }) &
  (ITEM extends { id: SelectItemDefault['id'] }
    ? {}
    : { getItemKey: SelectPropGetItemKey<ITEM> }) &
  (GROUP extends { label: SelectGroupDefault['label'] }
    ? {}
    : { getGroupLabel: SelectPropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: SelectGroupDefault['id'] }
    ? {}
    : { getGroupKey: SelectPropGetGroupKey<GROUP> });

export type SelectComponent = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: SelectProps<ITEM, GROUP, MULTIPLE>,
) => React.ReactElement | null;
