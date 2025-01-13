import React, { forwardRef } from 'react';

import {
  ComboboxComponent,
  ComboboxGroupDefault,
  ComboboxItemDefault,
  ComboboxProps,
} from '.';
import { SelectMultiple } from './SelectMultiple';
import { SelectSingle } from './SelectSingle';

const ComboboxRender = <
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
>(
  props: ComboboxProps<ITEM, GROUP, MULTIPLE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = props.multiple ? SelectMultiple : SelectSingle;

  return <Component ref={ref} {...props} />;
};

export const Combobox = forwardRef(ComboboxRender) as ComboboxComponent;
