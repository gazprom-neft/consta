import { IconSelect } from '@consta/icons/IconSelect';
import React, { forwardRef } from 'react';

import {
  FieldButton,
  FieldClearButton,
  FieldControlLayout,
  FieldControlLayoutProps,
  getFieldIconSize,
} from '..';
import { cnFieldSelectControlLayout } from './cnFieldSelectControlLayout';

type FieldButtonProps = Omit<
  FieldControlLayoutProps,
  'leftSide' | 'rightSide'
> & {
  open?: boolean;
  separator?: boolean;
  onClear?: (e: React.SyntheticEvent<Element, Event>) => void;
  onDropdownButton?: (e: React.SyntheticEvent<Element, Event>) => void;
};

export const FieldSelectControlLayout = forwardRef<
  HTMLDivElement,
  FieldButtonProps
>(
  (
    {
      className,
      size = 'm',
      onClear,
      open,
      separator,
      onDropdownButton,
      ...props
    },
    ref,
  ) => {
    return (
      <FieldControlLayout
        {...props}
        size={size}
        ref={ref}
        className={cnFieldSelectControlLayout({ separator }, [className])}
        rightSide={[
          onClear ? (
            <FieldClearButton tabIndex={-1} size={size} onClick={onClear} />
          ) : undefined,
          separator ? (
            <div className={cnFieldSelectControlLayout('Separator')} />
          ) : undefined,
          <FieldButton tabIndex={-1} onClick={onDropdownButton}>
            <IconSelect
              className={cnFieldSelectControlLayout('DropDownIcon', {
                open,
              })}
              size={getFieldIconSize(size)}
            />
          </FieldButton>,
        ]}
      />
    );
  },
);
