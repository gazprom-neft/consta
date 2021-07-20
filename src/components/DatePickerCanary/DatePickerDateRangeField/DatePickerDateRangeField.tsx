import './DatePickerDateRangeField.css';

import React, { forwardRef, useEffect, useRef, useState } from 'react';
import isBefore from 'date-fns/isBefore';

import { cn } from '../../../utils/bem';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { DatePickerDateField } from '../DatePickerDateField/DatePickerDateField';
import { datePickerErrorTypes } from '../helpers';

import { DatePickerDateRangeFieldProps, mapFormForEnd, mapFormForStart } from './helpers';

const cnDatePickerDateRangeField = cn('DatePickerDateRangeField');

export const DatePickerDateRangeField = forwardRef<HTMLDivElement, DatePickerDateRangeFieldProps>(
  (props, ref) => {
    const {
      className,
      form = 'default',
      startFieldInputRef,
      startFieldLeftSide,
      startFieldRightSide,
      endFieldInputRef,
      endFieldLeftSide,
      endFieldRightSide,
      value = [],
      onChange,
      onError,
      name,
      disabled,
      size,
      view,
      state,
      autoFocus,
      placeholder,
      readOnly,
      required,
      tabIndex,
      ariaLabel,
      iconSize,
      format,
      separator,
      minDate,
      maxDate,
      startFieldOnBlur,
      startFieldOnFocus,
      endFieldOnBlur,
      endFieldOnFocus,
      startFieldRef,
      endFieldRef,
      ...otherProps
    } = props;

    const commonProps = {
      className: cnDatePickerDateRangeField('Field'),
      disabled,
      name,
      onError,
      size,
      view,
      state,
      autoFocus,
      placeholder,
      readOnly,
      required,
      tabIndex,
      ariaLabel,
      iconSize,
      format,
      separator,
      minDate,
      maxDate,
    };

    const [startDate, setStartDate] = useState<Date | undefined | null>(value?.[0]);
    const [endDate, setEndDate] = useState<Date | undefined | null>(value?.[1]);
    const eventRef = useRef<Event>();

    const handleChange = (
      e: Event,
      ownStartDate: Date | undefined | null,
      ownEndDate: Date | undefined | null,
    ) => {
      const start = ownStartDate || startDate;
      const end = ownEndDate || endDate;

      if (!onChange) {
        return;
      }

      if (start && end) {
        if (isBefore(start, end)) {
          onChange({ e, value: [start, end] });
          return;
        }
        onError && onError({ type: datePickerErrorTypes[2], date: [start, end] });
        onChange({ e, value: [start, undefined] });
        return;
      }

      if (start) {
        onChange({ e, value: [start, undefined] });
        return;
      }

      if (end) {
        onChange({ e, value: [undefined, end] });
        return;
      }

      onChange({ e, value: null });
    };

    const handleStartDateChange = (props: { e: Event; value: Date | null }) => {
      if (props.value?.getTime() === startDate?.getTime()) {
        return;
      }
      eventRef.current = props.e;
      setStartDate(props.value);
    };

    const handleEndDateChange = (props: { e: Event; value: Date | null }) => {
      if (props.value?.getTime() === endDate?.getTime()) {
        return;
      }
      eventRef.current = props.e;
      setEndDate(props.value);
    };

    useEffect(() => {
      if (eventRef.current) {
        handleChange(eventRef.current, startDate, endDate);
      }
    }, [eventRef.current]);

    useEffect(() => {
      setStartDate(value?.[0]);
    }, [value?.[0]?.getTime()]);

    useEffect(() => {
      setEndDate(value?.[1]);
    }, [value?.[1]?.getTime()]);

    return (
      <div {...otherProps} className={cnDatePickerDateRangeField(null, [className])} ref={ref}>
        <DatePickerDateField
          {...commonProps}
          inputRef={startFieldInputRef}
          ref={startFieldRef}
          leftSide={startFieldLeftSide}
          rightSide={startFieldRightSide}
          form={getSizeByMap(mapFormForStart, form)}
          value={startDate}
          onChange={handleStartDateChange}
          onFocus={startFieldOnFocus}
          onBlur={startFieldOnBlur}
        />
        <DatePickerDateField
          {...commonProps}
          inputRef={endFieldInputRef}
          ref={endFieldRef}
          leftSide={endFieldLeftSide}
          rightSide={endFieldRightSide}
          form={getSizeByMap(mapFormForEnd, form)}
          value={endDate}
          onChange={handleEndDateChange}
          onFocus={endFieldOnFocus}
          onBlur={endFieldOnBlur}
        />
      </div>
    );
  },
);
