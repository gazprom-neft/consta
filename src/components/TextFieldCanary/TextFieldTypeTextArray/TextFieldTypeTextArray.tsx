import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  FieldArrayValueInlineControl,
  FieldArrayValueItem,
  FieldClearButton,
  FieldControlLayout,
  renderSide,
} from '##/components/FieldComponents';
import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { useKeys, UseKeysPropKeys } from '##/hooks/useKeys';
import { useMutableRef } from '##/hooks/useMutableRef';
import { getStyleProps } from '##/hooks/useStyleProps';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';

import { TextFieldPropRenderValueItem, TextFieldTypeComponent } from '../types';
import { useTextField } from '../useTextField';
import { cnTextFieldTypeTextArray } from './cnTextFieldTypeTextArray';

const defaultRenderValueItem: TextFieldPropRenderValueItem = ({
  item,
  index,
  size,
  disabled,
  onRemove,
}) => (
  <FieldArrayValueItem
    key={index}
    size={size}
    label={item}
    disabled={disabled}
    onRemove={onRemove}
  />
);

export const TextFieldTypeTextArray: TextFieldTypeComponent<'textarray'> =
  forwardRef((props, componentRef) => {
    const {
      className,
      value,
      defaultValue,
      onChange,
      id,
      name,
      inputRef: inputRefProp,
      maxLength,
      disabled,
      size = 'm',
      view = 'default',
      form,
      status,
      onBlur,
      onFocus,
      autoFocus,
      placeholder,
      leftSide,
      rightSide,
      autoComplete,
      withClearButton,
      readOnly,
      type,
      tabIndex,
      ariaLabel,
      iconSize,
      onClick,
      style,
      inputValue,
      renderValueItem = defaultRenderValueItem,
      onInputChange,
      // onKey props
      onKeyDown,
      onKeyDownCapture,
      onKeyUp,
      onKeyUpCapture,
      onCopy,
      onCopyCapture,
      onCut,
      onCutCapture,
      onPaste,
      onPasteCapture,
      onClear,
      onWheel,
      ...otherProps
    } = props;

    const {
      handleBlur,
      handleChange,
      handleClear: inputHandleClear,
      handleFocus,
      focused,
      withValue: withInputValue,
      ref,
      inputRef,
      handleClick,
    } = useTextField({
      onClick,
      onChange: onInputChange,
      onBlur,
      onFocus,
      disabled,
      onClear: undefined,
    });

    const withValue = withInputValue || !!value?.length;

    const controlRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);

    const mutableRefs = useMutableRef([
      onChange,
      inputHandleClear,
      value,
    ] as const);

    const getRemoveItem = (index: number) => (e: React.MouseEvent) => {
      if (value?.length) {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange?.(newValue.length ? newValue : null, { e });
      }
    };

    const handleClear = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        mutableRefs.current[1](e);
        if (mutableRefs.current[2]?.length) {
          mutableRefs.current[0]?.(null, { e });
        }
      },
      [],
    );

    const keys: UseKeysPropKeys<HTMLInputElement> = useMemo(
      () => ({
        Enter: (e) => {
          const stringValue = e.target.value;
          if (stringValue) {
            mutableRefs.current[0]?.(
              [...(mutableRefs.current[2] || []), stringValue],
              {
                e,
              },
            );

            if (controlRef.current) {
              controlRef.current.scrollTo({
                top: controlRef.current.scrollHeight,
              });
            }
          }
        },
        Backspace: (e) => {
          const stringValue = e.target.value;
          const currentValue = mutableRefs.current[2];

          if (!stringValue && currentValue?.length) {
            e.preventDefault();
            const newValue = [...currentValue];
            newValue.pop();
            mutableRefs.current[0]?.(newValue, {
              e,
            });
          }
        },
      }),
      [],
    );

    const handleInputKeyDown = useKeys<HTMLInputElement>({
      isActive: !!onChange,
      keys,
      onEvent: onKeyDown,
    });

    const controlSize = useComponentSize(controlRef);

    const stylesRoot: Record<'max-height' | 'height', string> | undefined =
      ref.current
        ? getStyleProps(ref.current, ['max-height', 'height'])
        : undefined;

    useEffect(() => {
      if (controlRef.current && scrollWrapperRef.current && focused) {
        scrollWrapperRef.current.scrollTo({
          top: controlSize.height,
        });
      }
    }, [controlSize.height]);

    useEffect(() => {
      if (inputRef.current && inputRef.current.value !== inputValue) {
        inputRef.current.value = inputValue || '';
      }
    }, [inputValue, inputRef.current]);

    return (
      <FieldControlLayout
        {...otherProps}
        className={cnTextFieldTypeTextArray({ withValue }, [className])}
        form={form}
        status={status}
        size={size}
        leftSide={renderSide(leftSide, size, iconSize)}
        rightSide={[
          withClearButton && !disabled && withValue && (
            <FieldClearButton size={size} onClick={onClear || handleClear} />
          ),
          renderSide(rightSide, size, iconSize),
        ]}
        focused={focused}
        view={view}
        ref={useForkRef([componentRef, ref])}
        disabled={disabled}
        onClick={handleClick}
        style={{
          ...style,
          ['--text-field-textarray-max-height' as string]:
            stylesRoot?.['max-height'] || stylesRoot?.height || 'auto',
        }}
      >
        <div
          ref={scrollWrapperRef}
          className={cnTextFieldTypeTextArray('ScrollWrapper', [
            cnMixScrollBar({ size: 'xs' }),
          ])}
        >
          <FieldArrayValueInlineControl
            size={size}
            inputRef={useForkRef([inputRef, inputRefProp])}
            value={value ?? undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            autoFocus={autoFocus}
            onKeyDown={handleInputKeyDown}
            ref={controlRef}
            placeholder={placeholder}
            renderValue={(items) =>
              items.map((item, index) =>
                renderValueItem({
                  item,
                  index,
                  size,
                  disabled,
                  onRemove: getRemoveItem(index),
                }),
              )
            }
            onCopy={onCopy}
            onCopyCapture={onCopyCapture}
            onCut={onCut}
            onCutCapture={onCutCapture}
            onPaste={onPaste}
            onPasteCapture={onPasteCapture}
            inputTabIndex={tabIndex}
            onKeyDownCapture={onKeyDownCapture}
            onKeyUp={onKeyUp}
            onKeyUpCapture={onKeyUpCapture}
            onWheel={onWheel}
            disabled={disabled}
          />
        </div>
      </FieldControlLayout>
    );
  });
