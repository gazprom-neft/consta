import './TextField.css';

import React, { useState } from 'react';
import TextAreaAutoSize from 'react-textarea-autosize';

import { IconProps, IconPropSize } from '../../icons/Icon/Icon';
import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
import { usePropsHandler } from '../EventInterceptor/usePropsHandler';

export type TextFieldPropValue = string | null;
export type TextFieldPropName = string;
export type TextFieldPropId = string | number;

export const textFieldPropSize = ['m', 'xs', 's', 'l'] as const;
export type TextFieldPropSize = typeof textFieldPropSize[number];
export const textFieldPropSizeDefault: TextFieldPropSize = textFieldPropSize[0];

export type TextFieldPropOnChange = (args: TextFieldOnChangeArguments) => void;
export type TextFieldOnChangeArguments = {
  e: React.ChangeEvent;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  value: TextFieldPropValue;
};

export const textFieldPropView = ['default', 'clear'] as const;
export type TextFieldPropView = typeof textFieldPropView[number];
export const textFieldPropViewDefault: TextFieldPropView = textFieldPropView[0];

export const textFieldPropForm = [
  'default',
  'defaultClear',
  'defaultBrick',
  'brick',
  'brickDefault',
  'brickClear',
  'brickRound',
  'round',
  'roundClear',
  'roundBrick',
  'clearRound',
  'clearDefault',
  'clearBrick',
  'clearClear',
] as const;
export type TextFieldPropForm = typeof textFieldPropForm[number];
export const textFieldPropFormDefault: TextFieldPropForm = textFieldPropForm[0];

export const textFieldPropState = ['alert', 'success', 'warning'] as const;
export type TextFieldPropState = typeof textFieldPropState[number];

export const textFieldPropWidth = ['default', 'full'] as const;
export type TextFieldPropWidth = typeof textFieldPropWidth[number];
export const textFieldPropWidthDefault: TextFieldPropWidth = textFieldPropWidth[0];

export type TextFieldPropAutoComplete = 'on' | 'off';

type Props = {
  className?: string;
  value?: TextFieldPropValue;
  onChange?: TextFieldPropOnChange;
  id?: TextFieldPropId;
  name?: TextFieldPropName;
  type?: string;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  size?: TextFieldPropSize;
  view?: TextFieldPropView;
  form?: TextFieldPropForm;
  state?: TextFieldPropState;
  width?: TextFieldPropWidth;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  autoFocus?: boolean;
  placeholder?: string;
  leftSide?: string | React.FC<IconProps>;
  rightSide?: string | React.FC<IconProps>;
  autoComplete?: TextFieldPropAutoComplete;
  max?: number | string;
  min?: number | string;
  readOnly?: boolean;
  required?: boolean;
  step?: number | string;
  tabIndex?: number;
  inputRef?: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
  ariaLabel?: string;
  iconSize?: IconPropSize;
  children?: never;
};

export type TextFieldProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnTextField = cn('TextField');

const sizeMap: Record<TextFieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
  const textFieldRef = ref || React.useRef<HTMLDivElement>(null);
  const {
    className,
    type = 'text',
    value,
    onChange,
    id,
    name,
    rows,
    cols,
    minRows,
    maxRows,
    inputRef,
    maxLength,
    disabled,
    size = textFieldPropSizeDefault,
    view = textFieldPropViewDefault,
    form = textFieldPropFormDefault,
    state,
    width = textFieldPropWidthDefault,
    onBlur,
    onFocus,
    autoFocus = false,
    placeholder,
    leftSide,
    rightSide,
    autoComplete,
    max,
    min,
    readOnly,
    required,
    step,
    tabIndex,
    ariaLabel,
    iconSize: iconSizeProp,
    ...otherProps
  } = usePropsHandler(cnTextField(), props, textFieldRef as React.RefObject<HTMLDivElement>);
  const [focus, setFocus] = useState<boolean>(autoFocus);
  const textarea = type === 'textarea';
  const LeftIcon = leftSide;
  const RightIcon = rightSide;
  const leftSideIsString = typeof leftSide === 'string';
  const rightSideIsString = typeof rightSide === 'string';
  const iconSize = getSizeByMap(sizeMap, size, iconSizeProp);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { value } = e.target;
    !disabled && onChange && onChange({ e, id, name, value: value || null });
  };

  const handleBlur: Props['onBlur'] = (e) => {
    setFocus(false);
    onBlur && onBlur(e);
  };

  const handleFocus: Props['onFocus'] = (e) => {
    setFocus(true);
    onFocus && onFocus(e);
  };

  const commonProps = {
    'className': cnTextField('Input'),
    'value': value || '',
    'onChange': handleChange,
    maxLength,
    disabled,
    'onBlur': handleBlur,
    'onFocus': handleFocus,
    autoFocus,
    placeholder,
    autoComplete,
    readOnly,
    required,
    tabIndex,
    name,
    'id': id ? id.toString() : undefined,
    'aria-label': ariaLabel,
  };

  const textareaProps = {
    rows,
    cols,
    minRows: minRows || rows,
    maxRows: maxRows || rows,
    inputRef:
      inputRef === null
        ? undefined
        : (inputRef as (node: HTMLTextAreaElement) => void | React.RefObject<HTMLTextAreaElement>),
  };

  const inputProps = {
    type,
    max,
    min,
    step,
    ref: inputRef as React.Ref<HTMLInputElement>,
  };

  return (
    <div
      className={cnTextField(
        {
          size,
          view,
          form,
          state,
          disabled,
          width,
          type,
          focus,
          withValue: !!value,
        },
        [className],
      )}
      ref={textFieldRef}
      {...otherProps}
    >
      {LeftIcon && (
        <div
          className={cnTextField('Side', {
            position: 'left',
            type: leftSideIsString ? 'string' : 'icon',
          })}
          title={typeof leftSide === 'string' ? leftSide : undefined}
        >
          {leftSideIsString ? (
            leftSide
          ) : (
            <LeftIcon className={cnTextField('Icon')} size={iconSize} />
          )}
        </div>
      )}
      {textarea ? (
        <TextAreaAutoSize {...commonProps} {...textareaProps} />
      ) : (
        <input {...commonProps} {...inputProps} />
      )}
      {RightIcon && (
        <div
          className={cnTextField('Side', {
            position: 'right',
            type: rightSideIsString ? 'string' : 'icon',
          })}
          title={typeof rightSide === 'string' ? rightSide : undefined}
        >
          {rightSideIsString ? (
            rightSide
          ) : (
            <RightIcon className={cnTextField('Icon')} size={iconSize} />
          )}
        </div>
      )}
    </div>
  );
});
