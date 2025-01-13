import React, { forwardRef } from 'react';

import { ListItem } from '##/components/ListCanary';
import { Text, TextPropSize } from '##/components/Text';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { Checkbox } from '../../Checkbox/Checkbox';
import { sizeCheckboxMap } from '../SelectItem/SelectItem';
import { PropSize } from '../types';

export type SelectItemAllProps = PropsWithHTMLAttributesAndRef<
  {
    checked: boolean;
    intermediate?: boolean;
    size: PropSize;
    hovered?: boolean;
    indent?: 'normal' | 'increased';
    countItems?: number;
    total?: number;
  },
  HTMLDivElement
>;

export const cnSelectItemAll = cn('SelectItemAll');

const textSizeMap: Record<PropSize, TextPropSize> = {
  xs: 's',
  s: 's',
  m: 'm',
  l: 'l',
};

export const SelectItemAll: React.FC<SelectItemAllProps> = forwardRef(
  (props, ref) => {
    const {
      checked,
      intermediate,
      size,
      indent,
      hovered,
      countItems = 0,
      className,
      total = 0,
      ...otherProps
    } = props;

    return (
      <ListItem
        {...otherProps}
        ref={ref}
        className={cnSelectItemAll(null, [className])}
        aria-selected={checked}
        role="option"
        label="Выбрать все"
        innerOffset={indent}
        size={size}
        active={hovered}
        rightSide={
          <Text
            size={textSizeMap[size]}
            lineHeight="xs"
            view="ghost"
          >{`${countItems} из ${total}`}</Text>
        }
        leftSide={
          <Checkbox
            checked={checked}
            intermediate={intermediate}
            size={sizeCheckboxMap[size]}
          />
        }
      >
        Выбрать все
      </ListItem>
    );
  },
);
