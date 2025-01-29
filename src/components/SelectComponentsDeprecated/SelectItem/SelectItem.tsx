import './SelectItem.css';

import React from 'react';

import { ListItem } from '##/components/ListCanary';
import { cnDeprecated } from '##/utils/bem';

import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Checkbox, CheckboxPropSize } from '../../Checkbox/Checkbox';
import { PropSize } from '../types';

export type SelectItemProps = PropsWithHTMLAttributes<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    multiple: boolean;
    size: PropSize;
    indent: 'normal' | 'increased';
    disabled: boolean | undefined;
  },
  HTMLDivElement
>;

export const sizeCheckboxMap: Record<PropSize, CheckboxPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

export const cnSelectItem = cnDeprecated('SelectItem');

export const SelectItem: React.FC<SelectItemProps> = (props) => {
  const {
    className,
    label,
    active,
    hovered,
    multiple,
    size,
    indent,
    disabled,
    ...otherProps
  } = props;

  return (
    <ListItem
      {...otherProps}
      className={cnSelectItem(null, [className])}
      aria-selected={active}
      aria-disabled={disabled}
      role="option"
      label={label}
      innerOffset={indent}
      size={size}
      active={hovered}
      checked={!multiple && active}
      disabled={disabled}
      leftSide={
        multiple && (
          <Checkbox
            checked={active}
            disabled={disabled}
            size={sizeCheckboxMap[size]}
          />
        )
      }
    >
      {label}
    </ListItem>
  );
};
