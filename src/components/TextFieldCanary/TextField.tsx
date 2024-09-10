import React, { forwardRef } from 'react';

import { TextFieldTypeNumber } from './TextFieldTypeNumber';
import { TextFieldTypePassword } from './TextFieldTypePassword';
import { TextFieldTypeText } from './TextFieldTypeText';
import { TextFieldTypeTextArea } from './TextFieldTypeTextArea';
import { TextFieldTypeTextArray } from './TextFieldTypeTextArray';
import {
  TextFieldComponent,
  TextFieldProps,
  TextFieldTypeComponent,
} from './types';

const typeMap: Record<
  string,
  | TextFieldTypeComponent<'text'>
  | TextFieldTypeComponent<'textArea'>
  | TextFieldTypeComponent<'password'>
  | TextFieldTypeComponent<'number'>
  | TextFieldTypeComponent<'textArray'>
> = {
  text: TextFieldTypeText,
  textArea: TextFieldTypeTextArea,
  password: TextFieldTypePassword,
  number: TextFieldTypeNumber,
  textArray: TextFieldTypeTextArray,
};

const TextFieldRender = <TYPE extends string>(
  props: TextFieldProps<TYPE>,
  ref: React.Ref<HTMLDivElement>,
) => {
  const Component = typeMap[props.type || 'text'] || typeMap.text;

  return <Component ref={ref} {...(props as TextFieldTypeComponent<TYPE>)} />;
};

export const TextField = forwardRef(TextFieldRender) as TextFieldComponent;
