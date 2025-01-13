import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { useMutableRef } from '##/hooks/useMutableRef';

import { FieldPropSize } from '../types';
import { cnFieldArrayValueInlineControl } from './cnFieldArrayValueInlineControl';
import {
  FieldArrayValueInlineControlComponent,
  FieldArrayValueInlineControlProps,
} from './types';

const gapMap: Record<FieldPropSize, string> = {
  l: 'calc(var(--space-3xs) + var(--space-2xs))',
  m: 'var(--space-2xs)',
  s: 'var(--space-3xs)',
  xs: 'var(--space-3xs)',
};

const verticalPaddingMap: Record<FieldPropSize, string> = {
  l: 'var(--space-xs)',
  m: 'calc(var(--space-xs) - var(--space-3xs))',
  s: 'var(--space-2xs)',
  xs: 'var(--space-3xs)',
};

const inputHeightMap: Record<FieldPropSize, string> = {
  l: 'var(--space-2xl)',
  m: 'calc(var(--space-2xl) - var(--space-2xs))',
  s: 'var(--space-xl)',
  xs: 'var(--space-l)',
};

const FieldArrayValueInlineControlRender = (
  props: FieldArrayValueInlineControlProps<unknown>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    className,
    inputRef: inputRefProp,
    inputMaxLength,
    value = [],
    inputDefaultValue,
    renderValue,
    onFocus,
    onBlur,
    autoFocus,
    inputTabIndex,
    inputAriaLabel,
    disabled,
    style,
    size = 'm',
    placeholder,
    onKeyDown,
    onKeyDownCapture,
    onChange,
    onKeyUp,
    onKeyUpCapture,
    onCopy,
    onCopyCapture,
    onCut,
    onCutCapture,
    onPaste,
    onPasteCapture,
    onWheel,
    ...otherProps
  } = props;

  const [inputValue, setInputValue] = useState('');
  const onInputChangeRef = useMutableRef(onChange);
  const fakeInputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setInputValue(e.target.value);
      onInputChangeRef.current?.(e);
    },
    [],
  );
  const { width: inputMinWidth } = useComponentSize(fakeInputRef);

  useEffect(() => {
    setInputValue(inputRef.current?.value || '');
  }, [inputRef.current?.value]);

  return (
    <div
      {...otherProps}
      className={cnFieldArrayValueInlineControl(null, [className])}
      ref={ref}
      style={{
        ...style,
        ['--field-array-value-inline-control-items-gap' as string]:
          gapMap[size],
        ['--field-array-value-inline-control-input-min-width' as string]: `${inputMinWidth}px`,
        ['--field-array-value-inline-control-vertical-padding' as string]: `${verticalPaddingMap[size]}`,
        ['--field-array-value-inline-control-input-height' as string]: `${inputHeightMap[size]}`,
      }}
    >
      {renderValue(value)}
      <input
        className={cnFieldArrayValueInlineControl('Input')}
        onChange={handleChange}
        ref={useForkRef([inputRef, inputRefProp])}
        maxLength={inputMaxLength}
        onFocus={onFocus}
        onBlur={onBlur}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
        tabIndex={inputTabIndex}
        aria-label={inputAriaLabel}
        onKeyDown={onKeyDown}
        onKeyDownCapture={onKeyDownCapture}
        onKeyUp={onKeyUp}
        onKeyUpCapture={onKeyUpCapture}
        disabled={disabled}
        type="text"
        placeholder={value.length ? undefined : placeholder}
        onCopy={onCopy}
        onCopyCapture={onCopyCapture}
        onCut={onCut}
        onCutCapture={onCutCapture}
        onPaste={onPaste}
        onPasteCapture={onPasteCapture}
        onWheel={onWheel}
        defaultValue={inputDefaultValue}
      />
      <div
        ref={fakeInputRef}
        className={cnFieldArrayValueInlineControl('HelperInputFakeElement')}
      >
        {inputValue}
      </div>
    </div>
  );
};

export const FieldArrayValueInlineControl = forwardRef(
  FieldArrayValueInlineControlRender,
) as FieldArrayValueInlineControlComponent;
