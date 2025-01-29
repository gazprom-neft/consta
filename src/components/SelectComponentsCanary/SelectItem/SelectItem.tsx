import './SelectItem.css';

import React, { forwardRef } from 'react';

import { Checkbox, CheckboxPropSize } from '##/components/Checkbox';
import { ListItem } from '##/components/ListCanary';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { PropSize } from '../types';

export type SelectItemProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    active: boolean;
    hovered: boolean;
    multiple?: boolean;
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

export const cnSelectItem = cn('SelectItem');

export const SelectItem: React.FC<SelectItemProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      label,
      active,
      hovered,
      multiple,
      size,
      indent,
      disabled,
      onClick,
      ...otherProps
    } = props;

    return (
      <ListItem
        {...otherProps}
        ref={ref}
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
        onClick={onClick}
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
  },
);
