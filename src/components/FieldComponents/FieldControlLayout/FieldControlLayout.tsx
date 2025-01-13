import React, { forwardRef } from 'react';

import { useFlag } from '##/hooks/useFlag';
import { forkRef } from '##/hooks/useForkRef';
import { useRefs } from '##/hooks/useRefs';
import { getElementWidth, useResizeObserved } from '##/hooks/useResizeObserved';

import { cnFieldControlLayout } from './cnFieldControlLayout';
import {
  formGuard,
  getBgColor,
  getBorderColor,
  getBorderRadius,
  getBorderStyle,
  getPadding,
  getSlots,
  getSlotsWidthStyles,
} from './helpers';
import { FieldControlLayoutProps } from './types';

const renderContentSlot = (
  node: React.ReactNode,
  index: number,
  slotsInnerRefs?: React.Ref<HTMLDivElement>[],
  slotsRefs?: React.Ref<HTMLDivElement>[],
) => (
  <div
    key={index}
    ref={forkRef([slotsInnerRefs?.[index], slotsRefs?.[index]])}
    className={cnFieldControlLayout('Slot')}
  >
    {node}
  </div>
);

export const FieldControlLayout = forwardRef<
  HTMLDivElement,
  FieldControlLayoutProps
>((props, ref) => {
  const {
    className,
    size = 'm',
    form: formProp = 'default',
    disabled = false,
    view = 'default',
    status,
    leftSide,
    rightSide,
    children,
    style,
    focused,
    leftSlotsRefs: leftSlotsRefsProp,
    rightSlotsRefs: rightSlotsRefsProp,
    alignSlots = 'top',
    ...otherProps
  } = props;
  const leftSlots = getSlots(leftSide);
  const rightSlots = getSlots(rightSide);
  const leftSlotsRefs = useRefs<HTMLDivElement>(leftSlots.length);
  const containerRefs = useRefs<HTMLDivElement>(1);
  const rightSlotsRefs = useRefs<HTMLDivElement>(rightSlots.length);
  const leftSlotsWidth = useResizeObserved(leftSlotsRefs, getElementWidth);
  const rightSlotsWidth = useResizeObserved(rightSlotsRefs, getElementWidth);
  const containerWidth = useResizeObserved(containerRefs, getElementWidth)[0];

  // ToDo: Удалить после того как удалим из всех компонентов "clearClear"
  const form = formGuard(formProp);

  const [hovered, setHovered] = useFlag();

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnFieldControlLayout({ form, disabled, view, alignSlots }, [
        className,
      ])}
      style={{
        ...style,
        ['--field-control-layout-border-color' as string]: getBorderColor(
          focused,
          hovered,
          status,
          disabled,
        ),
        ['--field-control-layout-height' as string]: `var(--control-height-${size})`,
        ['--field-control-layout-space' as string]: `calc(var(--control-space-${size}) * 0.5)`,
        ['--field-control-layout-text-size' as string]: `var(--control-text-size-${size})`,
        ['--field-control-layout-text-line-height' as string]: `var(--line-height-text-${size})`,
        ['--field-control-layout-border-radius' as string]: getBorderRadius(
          form,
          view,
        ),
        ['--field-control-layout-border-style' as string]: getBorderStyle(
          form,
          view,
        ),
        ['--field-control-layout-padding' as string]: getPadding(form, view),
        ['--field-control-layout-bg-color' as string]: getBgColor(
          view,
          disabled,
        ),
        ['--field-control-layout-border-width' as string]:
          view === 'default' ? 'var(--control-border-width)' : '0px',
        ['--field-control-layout-container-width' as string]: `${containerWidth}px`,
        ...getSlotsWidthStyles(leftSlotsWidth, 'left'),
        ...getSlotsWidthStyles(rightSlotsWidth, 'right'),
      }}
      onMouseEnter={setHovered.on}
      onMouseLeave={setHovered.off}
    >
      <div ref={containerRefs[0]} className={cnFieldControlLayout('Container')}>
        {!!leftSlots.length &&
          leftSlots.map((slot, index) =>
            renderContentSlot(slot, index, leftSlotsRefs, leftSlotsRefsProp),
          )}
        <div className={cnFieldControlLayout('Children')}>{children}</div>
        {!!rightSlots.length &&
          rightSlots.map((slot, index) =>
            renderContentSlot(slot, index, rightSlotsRefs, rightSlotsRefsProp),
          )}
      </div>
    </div>
  );
});
