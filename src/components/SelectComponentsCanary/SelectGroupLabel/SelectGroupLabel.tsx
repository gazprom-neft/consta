import React, { forwardRef } from 'react';

import { ListGroupLabel } from '##/components/ListCanary';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { PropSize } from '../types';

type SelectGroupLabelProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    size: PropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

export const SelectGroupLabel: React.FC<SelectGroupLabelProps> = forwardRef(
  ({ indent, ...otherProps }, ref) => (
    <ListGroupLabel {...otherProps} ref={ref} innerOffset={indent} />
  ),
);
