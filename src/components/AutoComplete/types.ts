import React from 'react';

import { PropRenderItem } from '##/components/Select';
import { TextFieldProps } from '##/components/TextField';

export type AutoCompleteItemDefault = {
  id: string | number;
  label: string;
  groupId?: number;
};

export type AutoCompleteGroupDefault = {
  label: string;
  id: number | string;
};

export type AutoCompletePropDropdownForm = 'default' | 'brick' | 'round';

export type AutoCompletePropGetItemLabel<ITEM> = (item: ITEM) => string;
export type AutoCompletePropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type AutoCompletePropGetItemGroupId<ITEM> = (
  item: ITEM,
) => number | undefined;
export type AutoCompletePropGetGroupLabel<GROUP> = (group: GROUP) => string;
export type AutoCompletePropGetGroupId<GROUP> = (
  group: GROUP,
) => number | string;

export type AutoCompletePropSearchFunction<ITEM> = (
  item: ITEM,
  searchValue: string,
) => boolean;

export type AutoCompletePropOnChange = (
  value: string | null,
  props: {
    e: React.ChangeEvent | React.MouseEvent | React.KeyboardEvent;
    id?: string;
    name?: string;
  },
) => void;

export type AutoCompleteProps<
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
> = {
  items: ITEM[];
  groups?: GROUP[];
  renderItem?: PropRenderItem<ITEM>;
  dropdownClassName?: string;
  dropdownForm?: AutoCompletePropDropdownForm;
  isLoading?: boolean;
  searchFunction?: AutoCompletePropSearchFunction<ITEM>;
  dropdownRef?: React.RefObject<HTMLDivElement>;
  getItemLabel?: AutoCompletePropGetItemLabel<ITEM>;
  getItemKey?: AutoCompletePropGetItemKey<ITEM>;
  getItemGroupKey?: AutoCompletePropGetItemGroupId<ITEM>;
  getGroupLabel?: AutoCompletePropGetGroupLabel<GROUP>;
  getGroupKey?: AutoCompletePropGetGroupId<GROUP>;
  onChange?: AutoCompletePropOnChange;
  virtualScroll?: boolean;
  onScrollToBottom?: (length: number) => void;
  onDropdownOpen?: (isOpen: boolean) => void;
  dropdownOpen?: boolean;
  ignoreOutsideClicksRefs?: ReadonlyArray<React.RefObject<HTMLElement>>;
  searchDebounceDelay?: number;
} & Omit<
  TextFieldProps<TYPE>,
  'max' | 'min' | 'step' | 'incrementButtons' | 'onChange' | 'width'
> &
  (ITEM extends { label: AutoCompleteItemDefault['label'] }
    ? {}
    : {
        getItemLabel: AutoCompletePropGetItemLabel<ITEM>;
      }) &
  (ITEM extends { id: AutoCompleteItemDefault['id'] }
    ? {}
    : { getItemKey: AutoCompletePropGetItemKey<ITEM> }) &
  (GROUP extends { label: AutoCompleteGroupDefault['label'] }
    ? {}
    : { getGroupLabel: AutoCompletePropGetGroupLabel<GROUP> }) &
  (GROUP extends { id: AutoCompleteGroupDefault['id'] }
    ? {}
    : { getGroupKey: AutoCompletePropGetGroupId<GROUP> });

export type AutoCompleteComponent = <
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  props: AutoCompleteProps<TYPE, ITEM, GROUP>,
) => React.ReactElement | null;
