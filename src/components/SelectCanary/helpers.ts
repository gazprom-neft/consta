import { IconPropSize } from '@consta/icons/Icon';

import { FieldPropSize } from '##/components/FieldComponents';

import {
  SelectGroupDefault,
  SelectItemDefault,
  SelectPropGetGroupKey,
  SelectPropGetGroupLabel,
  SelectPropGetItemDisabled,
  SelectPropGetItemGroupKey,
  SelectPropGetItemKey,
  SelectPropGetItemLabel,
  SelectProps,
} from '.';

export const defaultGetItemKey: SelectPropGetItemKey<SelectItemDefault> = (
  item,
) => item.id;
export const defaultGetItemLabel: SelectPropGetItemLabel<SelectItemDefault> = (
  item,
) => item.label;
export const defaultGetItemGroupKey: SelectPropGetItemGroupKey<
  SelectItemDefault
> = (item) => item.groupId;
export const defaultGetItemDisabled: SelectPropGetItemDisabled<
  SelectItemDefault
> = (item) => item.disabled;

export const defaultGetGroupKey: SelectPropGetGroupKey<SelectGroupDefault> = (
  group,
) => group.id;
export const defaultGetGroupLabel: SelectPropGetGroupLabel<
  SelectGroupDefault
> = (group) => group.label;

export const isMultipleParams = <ITEM, GROUP>(
  params: SelectProps<ITEM, GROUP, boolean>,
): params is SelectProps<ITEM, GROUP, true> => {
  return !!params.multiple;
};

export const isNotMultipleParams = <ITEM, GROUP>(
  params: SelectProps<ITEM, GROUP, boolean>,
): params is SelectProps<ITEM, GROUP, false> => {
  return !params.multiple;
};

export function withDefaultGetters<
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
>(props: SelectProps<ITEM, GROUP, MULTIPLE>) {
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
