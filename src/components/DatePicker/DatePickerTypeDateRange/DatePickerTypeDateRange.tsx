import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useClickOutside } from '##/hooks/useClickOutside';
import { useForkRef } from '##/hooks/useForkRef';

import {
  DatePickerDropdown,
  DatePickerDropdownPropOnChange,
} from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDateRange } from '../DatePickerFieldTypeDateRange/DatePickerFieldTypeDateRange';
import {
  getDropdownZIndex,
  getFieldName,
  normalizeRangeValue,
} from '../helpers';
import {
  datePickerPropDateTimeViewDefault,
  DatePickerTypeComponent,
} from '../types';
import { useCalendarVisible } from '../useCalendarVisible';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeDateRange: DatePickerTypeComponent<'date-range'> =
  forwardRef((props, ref) => {
    const {
      events,
      dateTimeView = datePickerPropDateTimeViewDefault,
      locale,
      dropdownForm,
      onFocus,
      onBlur,
      leftSide,
      rightSide,
      currentVisibleDate: currentVisibleDateProp,
      onChangeCurrentVisibleDate,
      renderAdditionalControls,
      inputRef,
      dropdownClassName,
      dropdownRef,
      name,
      placeholder,
      onDropdownOpen,
      dropdownOpen,
      ignoreOutsideClicksRefs,
      disabled,
      disableDates,
      ...fieldProps
    } = props;

    const startFieldRef = useRef<HTMLDivElement>(null);
    const endFieldRef = useRef<HTMLDivElement>(null);
    const startFieldInputRef = useRef<HTMLInputElement>(null);
    const endFieldInputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);

    const [fieldFocused, setFieldFocused] = useState<0 | 1 | undefined>();

    const startFocused = fieldFocused === 0;
    const endFocused = fieldFocused === 1;

    const handleChange: DatePickerDropdownPropOnChange = (value, { e }) => {
      if (startFocused) {
        const newValue = normalizeRangeValue([value, props?.value?.[1]]);
        props.onChange?.(newValue, {
          e,
        });
      }
      if (endFocused) {
        const newValue = normalizeRangeValue([props?.value?.[0], value]);
        props.onChange?.(newValue, {
          e,
        });
      }
    };

    const [calendarVisible, setCalendarVisible] = useCalendarVisible({
      dropdownOpen,
      onDropdownOpen,
      disabled,
      startRef: startFieldInputRef,
      endRef: endFieldInputRef,
    });

    const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
      currentVisibleDate: currentVisibleDateProp,
      maxDate: props.maxDate,
      minDate: props.minDate,
      value: props.value,
      startOfUnit: startOfMonth,
      onChangeCurrentVisibleDate,
      calendarVisible,
      rangeIndex: fieldFocused,
    });

    const startFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) =>
      Array.isArray(onBlur) ? onBlur[0]?.(e) : onBlur?.(e);

    const endFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) =>
      Array.isArray(onBlur) ? onBlur[1]?.(e) : onBlur?.(e);

    const startFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused(0);
      Array.isArray(onFocus) ? onFocus[0]?.(e) : onFocus?.(e);
    };

    const endFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setFieldFocused(1);
      Array.isArray(onFocus) ? onFocus[1]?.(e) : onFocus?.(e);
    };

    // эффект для того чтобы календарь переключался при вводе с клавиатуры
    useEffect(() => {
      if (props.value?.[0] && dateTimeView === 'classic' && startFocused) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[0] && dateTimeView !== 'classic' && startFocused) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addMonths(currentVisibleDate, 1).getTime())
        ) {
          setCurrentVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[0]?.getTime(), calendarVisible, startFocused]);

    useEffect(() => {
      if (props.value?.[1] && dateTimeView === 'classic' && endFocused) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (newVisibleDate.getTime() !== currentVisibleDate?.getTime()) {
          setCurrentVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[1] && dateTimeView !== 'classic' && endFocused) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (
          newVisibleDate.getTime() !== currentVisibleDate?.getTime() &&
          newVisibleDate.getTime() !==
            (currentVisibleDate && addMonths(currentVisibleDate, 1).getTime())
        ) {
          setCurrentVisibleDate(addMonths(newVisibleDate, -1));
        }
      }
    }, [props.value?.[1]?.getTime(), calendarVisible, endFocused]);

    useClickOutside({
      isActive: calendarVisible,
      ignoreClicksInsideRefs: [
        startFieldRef,
        endFieldRef,
        calendarRef,
        ...(ignoreOutsideClicksRefs ?? []),
      ],
      handler: useCallback(() => {
        setFieldFocused(undefined);
        setCalendarVisible.off();
      }, []),
    });

    return (
      <>
        <DatePickerFieldTypeDateRange
          {...fieldProps}
          ref={ref}
          startFieldRef={startFieldRef}
          endFieldRef={endFieldRef}
          startFieldInputRef={useForkRef([startFieldInputRef, inputRef?.[0]])}
          endFieldInputRef={useForkRef([endFieldInputRef, inputRef?.[1]])}
          startFieldOnFocus={startFieldOnFocusHandler}
          endFieldOnFocus={endFieldOnFocusHandler}
          startFieldLeftSide={
            Array.isArray(leftSide) ? leftSide?.[0] : leftSide
          }
          startFieldRightSide={
            Array.isArray(rightSide) ? rightSide?.[0] : undefined
          }
          endFieldLeftSide={Array.isArray(leftSide) ? leftSide?.[1] : undefined}
          endFieldRightSide={
            Array.isArray(rightSide) ? rightSide?.[1] : rightSide
          }
          startFieldOnBlur={startFieldOnBlurHandler}
          startFieldOnClick={setCalendarVisible.on}
          endFieldOnClick={setCalendarVisible.on}
          endFieldOnBlur={endFieldOnBlurHandler}
          startFocused={startFocused}
          endFocused={endFocused}
          startFieldName={getFieldName(name, 0)}
          endFieldName={getFieldName(name, 1)}
          startFieldPlaceholder={
            Array.isArray(placeholder) ? placeholder?.[0] : placeholder
          }
          endFieldPlaceholder={
            Array.isArray(placeholder) ? placeholder?.[1] : placeholder
          }
          disabled={disabled}
        />
        <DatePickerDropdown
          type="date"
          ref={useForkRef([dropdownRef, calendarRef])}
          anchorRef={startFieldRef}
          className={dropdownClassName}
          isOpen={calendarVisible}
          onChangeCurrentVisibleDate={setCurrentVisibleDate}
          currentVisibleDate={currentVisibleDate}
          value={props.value || undefined}
          view={dateTimeView}
          events={events}
          locale={locale}
          minDate={props.minDate}
          maxDate={props.maxDate}
          form={dropdownForm}
          onChange={handleChange}
          renderAdditionalControls={renderAdditionalControls}
          zIndex={getDropdownZIndex(props.style)}
          disableDates={disableDates}
        />
      </>
    );
  });
