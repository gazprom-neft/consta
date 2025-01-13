import React from 'react';

import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

import { FieldPropSize } from '../types';

export type FieldArrayValueInlineControlProps<ITEM> =
  PropsWithHTMLAttributesAndRef<
    {
      children?: never;
      value?: ITEM[];
      renderValue: (items: ITEM[]) => React.ReactNode;
      inputMaxLength?: number;
      inputValue?: string;
      inputDefaultValue?: string;
      inputRef?: React.Ref<HTMLInputElement>;
      onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
      onBlur?: React.FocusEventHandler<HTMLInputElement>;
      onChange?: React.ChangeEventHandler<HTMLInputElement>;
      autoFocus?: boolean;
      inputTabIndex?: number;
      inputAriaLabel?: string;
      onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
      onKeyDownCapture?: React.KeyboardEventHandler<HTMLInputElement>;
      onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
      onKeyUpCapture?: React.KeyboardEventHandler<HTMLInputElement>;
      disabled?: boolean;
      placeholder?: string;
      size?: FieldPropSize;
      onWheel?: React.WheelEventHandler<HTMLInputElement>;
    },
    HTMLDivElement
  >;

export type FieldArrayValueInlineControlComponent = <ITEM>(
  props: FieldArrayValueInlineControlProps<ITEM>,
) => React.ReactElement | null;
