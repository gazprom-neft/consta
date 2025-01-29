import React, { forwardRef } from 'react';

import {
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectProps,
} from '.';
import { SelectMultiple } from './SelectMultiple';
import { SelectSingle } from './SelectSingle';

const SelectRender = <
  ITEM = SelectItemDefault,
  GROUP = SelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: SelectProps<ITEM, GROUP, MULTIPLE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = props.multiple ? SelectMultiple : SelectSingle;

  return <Component ref={ref} {...props} />;
};

export const Select = forwardRef(SelectRender) as SelectComponent;
