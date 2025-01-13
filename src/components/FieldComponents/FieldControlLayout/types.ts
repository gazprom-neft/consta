import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import {
  FieldPropForm,
  FieldPropSize,
  FieldPropStatus,
  FieldPropView,
} from '../types';

export type FieldControlLayoutProps = PropsWithHTMLAttributesAndRef<
  {
    size?: FieldPropSize;
    form?: FieldPropForm;
    disabled?: boolean;
    view?: FieldPropView;
    status?: FieldPropStatus;
    leftSide?: React.ReactNode | JSX.Element[];
    rightSide?: React.ReactNode | JSX.Element[];
    children?: React.ReactNode;
    focused?: boolean;
    leftSlotsRefs?: React.Ref<HTMLDivElement>[];
    rightSlotsRefs?: React.Ref<HTMLDivElement>[];
    alignSlots?: 'top' | 'center';
  },
  HTMLDivElement
>;
