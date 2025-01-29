import './FieldArrayValueItem.css';

import React, { forwardRef } from 'react';

import { TagBase } from '##/components/TagBase';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type FieldArrayValueItemProps = PropsWithHTMLAttributesAndRef<
  {
    label: string;
    size: 's' | 'm' | 'l' | 'xs';
    children?: never;
    disabled?: boolean;
    onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  },
  HTMLSpanElement
>;

export const cnFieldArrayValueItem = cn('FieldArrayValueItem');

export const FieldArrayValueItem: React.FC<FieldArrayValueItemProps> =
  forwardRef((props, ref) => {
    const { onRemove, size, label, disabled, ...otherProps } = props;

    return (
      <TagBase
        {...otherProps}
        as="span"
        className={cnFieldArrayValueItem({ disabled })}
        ref={ref}
        label={label}
        onCancel={disabled ? undefined : onRemove}
        size={size}
        cancelButtonTabIndex={-1}
        view="filled"
        disabled={disabled}
      />
    );
  });
