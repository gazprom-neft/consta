import React, { CSS, CSSProperties } from 'react';

import { isNotNil } from '##/utils/type-guards';

import { FieldPropForm, FieldPropStatus, FieldPropView } from '../types';
import {
  borderRadiusMap,
  borderWidthMap,
  FieldControlLayoutBorderRadiusNode,
  FieldControlLayoutBorderWidthNode,
  FieldControlLayoutPaddingNode,
  paddingMap,
} from './maps';

export const getSlots = (
  side: React.ReactNode | JSX.Element[],
): React.ReactNode[] => {
  return ((Array.isArray(side) ? side : [side]) as []).filter(
    (item) => isNotNil(item) && item !== false,
  );
};

const borderToCss = (value: FieldControlLayoutBorderWidthNode) => {
  return value ? 'solid' : 'none';
};

export const getBorderStyle = (
  form: FieldPropForm,
  view: FieldPropView,
): string => {
  return view === 'default'
    ? `solid ${borderToCss(borderWidthMap[form][1])} solid ${borderToCss(
        borderWidthMap[form][0],
      )}`
    : `none`;
};

const paddingToCss = (value: FieldControlLayoutPaddingNode): string => {
  return value === 'increased'
    ? 'calc(var(--field-control-layout-space) * 1.6)'
    : 'var(--field-control-layout-space)';
};

export const getPadding = (
  form: FieldPropForm,
  view: FieldPropView,
): string => {
  return view === 'default'
    ? `0px ${paddingToCss(paddingMap[form][1])} 0px ${paddingToCss(
        paddingMap[form][0],
      )}`
    : `1px 0px 1px 0px`;
};

const borderRadiusToCss = (
  value: FieldControlLayoutBorderRadiusNode,
): string => {
  if (value === 'default') {
    return 'var(--control-radius)';
  }
  if (value === 'round') {
    return 'calc(var(--field-control-layout-height) / 2)';
  }
  return '0px';
};

export const getBorderRadius = (
  form: FieldPropForm,
  view: FieldPropView,
): string => {
  return view === 'default'
    ? borderRadiusMap[form].map(borderRadiusToCss).join(' ')
    : `0px 0px 0px 0px`;
};

export const getBorderColor = (
  focused?: boolean,
  hovered?: boolean,
  status?: FieldPropStatus,
  disabled?: boolean,
) => {
  if (disabled) {
    return 'transparent';
  }
  if (focused) {
    return 'var(--color-control-bg-border-focus)';
  }
  if (hovered) {
    return 'var(--color-control-bg-border-default-hover)';
  }
  if (status) {
    return `var(--color-bg-${status})`;
  }
  return 'var(--color-control-bg-border-default)';
};

export const getBgColor = (view: FieldPropView, disabled?: boolean) => {
  if (view === 'default' && disabled) {
    return 'var(--color-control-bg-disable)';
  }
  if (view === 'default') {
    return 'var(--color-bg-default)';
  }
};

export const getSlotsWidthStyles = (
  sizes: number[],
  postfix: string,
): CSSProperties => {
  const style: CSSProperties = {};
  for (let index = 0; index < sizes.length; index++) {
    style[
      `--field-control-layout-${postfix}-slot-content-width-${index}` as 'width'
    ] = `${sizes[index]}px`;
  }

  style[
    `--field-control-layout-${postfix}-slot-contents-width` as 'width'
  ] = `${sizes.length ? sizes.reduce((a, b) => a + b) : 0}px`;

  style[
    `--field-control-layout-${postfix}-slots-length` as 'width'
  ] = `${sizes.length}`;

  return style;
};

// ToDo: Удалить после того как удалим из всех компонентов "clearClear"
export const formGuard = (from: FieldPropForm | 'clearClear'): FieldPropForm =>
  from === 'clearClear' ? 'clear' : from;
