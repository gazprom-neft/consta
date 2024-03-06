import './Chips.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

import { ChipsItem } from './ChipsItem';
import { withDefaultGetters } from './helpers';
import { ChipsComponent, ChipsProps } from './types';

const cnChips = cn('Chips');

const ChipsRender = (props: ChipsProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    items,
    getItemActive,
    getItemDisabled,
    getItemAs,
    getItemAttributes,
    getItemIconLeft,
    getItemIconRight,
    getItemLabel,
    getItemRef,
    getItemStatus,
    className,
    interactive,
    onItemClick,
    onItemRightIconClick,
    activeView,
    size,
    disabled = false,
    ...otherProps
  } = withDefaultGetters(props);

  return (
    <div {...otherProps} ref={ref} className={cnChips(null, [className])}>
      {items.map((item, index) => {
        const itemDisabled = getItemDisabled(item) || disabled;
        return (
          <ChipsItem
            {...getItemAttributes(item)}
            key={index}
            size={size}
            activeView={activeView}
            onClick={
              onItemClick && !itemDisabled
                ? (e: React.MouseEvent) => onItemClick(item, { e })
                : undefined
            }
            onRightIconClick={
              onItemRightIconClick && itemDisabled
                ? (e: React.MouseEvent) => onItemRightIconClick(item, { e })
                : undefined
            }
            label={getItemLabel(item)}
            as={getItemAs(item)}
            active={getItemActive(item)}
            iconLeft={getItemIconLeft(item)}
            iconRight={getItemIconRight(item)}
            ref={getItemRef(item)}
            status={getItemStatus(item)}
            interactive={!itemDisabled && interactive}
            disabled={itemDisabled}
          />
        );
      })}
    </div>
  );
};

export const Chips = forwardRef(ChipsRender) as ChipsComponent;
