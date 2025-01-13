import { IconPhoto } from '@consta/icons/IconPhoto';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/FieldComponents/__mocks__/variants';

import { TextField } from '..';

const getStep = (
  type: string | undefined,
  withStepArray: boolean,
  step: number | undefined,
) => {
  if (type !== 'number') {
    return undefined;
  }

  if (withStepArray) {
    return [10, 50, 100];
  }

  return step;
};

const resizeMap = {
  true: true,
  false: false,
  auto: 'auto',
} as const;

const Variants = () => {
  const type = useSelect(
    'type',
    ['text', 'number', 'textarea', 'password', 'textarray'],
    'text',
  );
  const resize =
    useSelect(
      'resize',
      ['false', 'true', 'auto'],
      'false',
      type === 'textarea',
    ) || 'false';
  const rows = useNumber('rows', 3, type === 'textarea' && resize !== 'auto');
  const minRows = useNumber(
    'minRows',
    1,
    type === 'textarea' && resize === 'auto',
  );
  const maxRows = useNumber(
    'maxRows',
    5,
    type === 'textarea' && resize === 'auto',
  );
  const step = useNumber('step', 1, type === 'number');
  const withStepArray = useBoolean('withStepArray', false, type === 'number');
  const incrementButtons = useBoolean(
    'incrementButtons',
    true,
    type === 'number',
  );
  const min = useNumber('min', 0, type === 'number');
  const max = useNumber('max', 150, type === 'number');
  const form = useSelect('form', fieldPropForm, fieldPropFormDefault);
  const status = useSelect('status', fieldPropStatus);
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const disabled = useBoolean('disabled', false);
  const withClearButton = useBoolean('withClearButton', true);

  const maxLength = useNumber('maxLength', 200, type !== 'number');
  const placeholder = useText('placeholder', 'Подсказка в поле');
  const leftSideType = useSelect('leftSideType', ['icon', 'text']);
  const leftSideText = useText('leftSideText', 'from');
  const rightSideType = useSelect('rightSideType', ['icon', 'text']);
  const rightSideText = useText('rightSideText', 'm²');

  const leftSideSelect = {
    text: leftSideText,
    icon: IconPhoto,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconPhoto,
  };

  const leftSide = leftSideType && leftSideSelect[leftSideType];
  const rightSide = rightSideType && rightSideSelect[rightSideType];

  const [value, setValue] = useState<string[] | null>(null);
  const [stringValue, setStringValue] = useState<string | null>(null);

  const onChange = (value: string[] | null) => {
    setStringValue(null);
    setValue(value);
  };

  return (
    <TextField
      {...(type === 'textarray'
        ? {
            value,
            inputValue: stringValue,
            onInputChange: setStringValue,
            onChange,
          }
        : {})}
      id="inputId"
      form={form}
      status={status}
      size={size}
      view={view}
      disabled={disabled}
      style={{ width: '100%' }}
      leftSide={leftSide}
      rightSide={rightSide}
      maxLength={maxLength}
      withClearButton={withClearButton}
      placeholder={placeholder}
      type={type}
      incrementButtons={type === 'number' ? incrementButtons : undefined}
      min={type === 'number' ? min : undefined}
      max={type === 'number' ? max : undefined}
      step={getStep(type, withStepArray, step)}
      resize={type === 'textarea' ? resizeMap[resize] : undefined}
      maxRows={type === 'textarea' && resize === 'auto' ? maxRows : undefined}
      minRows={type === 'textarea' && resize === 'auto' ? minRows : undefined}
      rows={type === 'textarea' && resize !== 'auto' ? rows : undefined}
    />
  );
};

export default Variants;
