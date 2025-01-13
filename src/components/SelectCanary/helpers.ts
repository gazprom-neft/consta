import { IconPropSize } from '@consta/icons/Icon';

import { FieldPropSize } from '##/components/FieldComponents';

import {
  ComboboxGroupDefault,
  ComboboxItemDefault,
  ComboboxPropGetGroupKey,
  ComboboxPropGetGroupLabel,
  ComboboxPropGetItemDisabled,
  ComboboxPropGetItemGroupKey,
  ComboboxPropGetItemKey,
  ComboboxPropGetItemLabel,
  ComboboxProps,
} from '.';

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

export const clearSizeMap: Record<FieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

export const iconSizeMap: Record<FieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'm',
};
