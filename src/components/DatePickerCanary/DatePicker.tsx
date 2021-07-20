import React, { forwardRef } from 'react';

import { maxDateDefault, minDateDefault } from '../../utils/date';

import { DatePickerTypeDate } from './DatePickerTypeDate/DatePickerTypeDate';
import { DatePickerTypeDateRange } from './DatePickerTypeDateRange/DatePickerTypeDateRange';
import {
  DatePickerComponent,
  DatePickerProps,
  DatePickerPropType,
  datePickerPropTypeDefault,
  isDateRangeParams,
  isNotDateRangeParams,
} from './helpers';

export const DatePicker: DatePickerComponent = forwardRef((props, ref) => {
  const propsWidthDefault: DatePickerProps<DatePickerPropType> = {
    ...props,
    type: props.type || datePickerPropTypeDefault,
    minDate: props.minDate || minDateDefault,
    maxDate: props.maxDate || maxDateDefault,
  };
  if (isNotDateRangeParams(propsWidthDefault)) {
    return <DatePickerTypeDate {...propsWidthDefault} ref={ref} />;
  }
  if (isDateRangeParams(propsWidthDefault)) {
    return <DatePickerTypeDateRange {...propsWidthDefault} ref={ref} />;
  }
  return null;
});
