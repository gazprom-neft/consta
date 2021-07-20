import React, { forwardRef, useEffect, useRef, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import {
  DatePickerCalendar,
  DatePickerCalendarProps,
} from '../DatePickerCalendar/DatePickerCalendar';
import { DatePickerDateRangeField } from '../DatePickerDateRangeField/DatePickerDateRangeField';
import { DatePickerTypeDateRangeComponent } from '../helpers';

export const DatePickerTypeDateRange: DatePickerTypeDateRangeComponent = forwardRef(
  (props, ref) => {
    const {
      events,
      calendarView,
      locale,
      currentVisibleDate: currentVisibleDateProp,
      calendarForm,
      startFieldRightSide,
      startFieldLeftSide,
      startFieldOnBlur,
      startFieldOnFocus,
      endFieldRightSide,
      endFieldLeftSide,
      endFieldOnBlur,
      endFieldOnFocus,
      onFocus,
      onBlur,
      leftSide,
      rightSide,
      isMobile,
      ...fieldProps
    } = props;

    const startFieldRef = useRef<HTMLDivElement>(null);
    const endFieldRef = useRef<HTMLDivElement>(null);
    const startCalendarRef = useRef<HTMLDivElement>(null);
    const endCalendarRef = useRef<HTMLDivElement>(null);
    const animateStartTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animateEndTimeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [startCalendarVisible, setStartCalendarVisible] = useState<boolean>(false);
    const [endCalendarVisible, setEndCalendarVisible] = useState<boolean>(false);

    const [startCalendarVisibleDate, setStartCalendarVisibleDate] = useState<Date | undefined>(
      currentVisibleDateProp,
    );
    const [endCalendarVisibleDate, setEndCalendarVisibleDate] = useState<Date | undefined>(
      currentVisibleDateProp,
    );

    const commonProps: Omit<DatePickerCalendarProps<'date-range'>, 'anchorRef'> = {
      value: props.value || undefined,
      type: props.type,
      view: calendarView,
      events,
      locale,
      minDate: props.minDate,
      maxDate: props.maxDate,
      form: calendarForm,
      onChange: props.onChange,
      isMobile,
    };

    const startFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) => {
      onBlur && onBlur(e);
      startFieldOnBlur && startFieldOnBlur(e);
    };

    const endFieldOnBlurHandler = (e: React.FocusEvent<HTMLElement>) => {
      onBlur && onBlur(e);
      endFieldOnBlur && endFieldOnBlur(e);
    };

    const startFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setStartCalendarVisible(true);
      onFocus && onFocus(e);
      startFieldOnFocus && startFieldOnFocus(e);
      if (isMobile) {
        e.target.blur();
      }
    };

    const endFieldOnFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
      setEndCalendarVisible(true);
      onFocus && onFocus(e);
      endFieldOnFocus && endFieldOnFocus(e);
      if (isMobile) {
        e.target.blur();
      }
    };

    const resetCalendarVisibleDate = () => {
      if (!startCalendarVisible) {
        animateStartTimeOutRef.current && clearTimeout(animateStartTimeOutRef.current);
        animateStartTimeOutRef.current = setTimeout(
          () =>
            setStartCalendarVisibleDate(
              props.value?.[0] ? startOfMonth(props.value[0]) : undefined,
            ),
          200,
        );
      }
      if (!endCalendarVisible) {
        animateEndTimeOutRef.current && clearTimeout(animateEndTimeOutRef.current);
        animateEndTimeOutRef.current = setTimeout(() => {
          if (!props.value?.[1]) {
            setEndCalendarVisibleDate(undefined);
            return;
          }
          setEndCalendarVisibleDate(
            props.calendarView === 'oneMonth'
              ? startOfMonth(props.value[1])
              : addMonths(startOfMonth(props.value[1]), -1),
          );
        }, 200);
      }
    };

    useClickOutside({
      isActive: startCalendarVisible,
      ignoreClicksInsideRefs: [startFieldRef, startCalendarRef],
      handler: () => setStartCalendarVisible(false),
    });

    useClickOutside({
      isActive: endCalendarVisible,
      ignoreClicksInsideRefs: [endFieldRef, endCalendarRef],
      handler: () => setEndCalendarVisible(false),
    });

    useEffect(() => {
      if (props.value?.[0] && props.calendarView === 'oneMonth' && startCalendarVisibleDate) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (newVisibleDate.getTime() !== startCalendarVisibleDate.getTime()) {
          setStartCalendarVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[0] && props.calendarView !== 'oneMonth' && startCalendarVisibleDate) {
        const newVisibleDate = startOfMonth(props.value[0]);
        if (
          newVisibleDate.getTime() !== startCalendarVisibleDate.getTime() &&
          newVisibleDate.getTime() !== addMonths(startCalendarVisibleDate, 1).getTime()
        ) {
          setStartCalendarVisibleDate(newVisibleDate);
        }
      }
    }, [props.value?.[0]]);

    useEffect(() => {
      if (props.value?.[1] && props.calendarView === 'oneMonth' && endCalendarVisibleDate) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (newVisibleDate.getTime() !== endCalendarVisibleDate.getTime()) {
          setEndCalendarVisibleDate(newVisibleDate);
        }
        return;
      }
      if (props.value?.[1] && props.calendarView !== 'oneMonth' && endCalendarVisibleDate) {
        const newVisibleDate = startOfMonth(props.value[1]);
        if (
          newVisibleDate.getTime() !== endCalendarVisibleDate.getTime() &&
          newVisibleDate.getTime() !== addMonths(endCalendarVisibleDate, 1).getTime()
        ) {
          setEndCalendarVisibleDate(addMonths(newVisibleDate, -1));
        }
      }
    }, [props.value?.[1]]);

    useEffect(resetCalendarVisibleDate, [startCalendarVisible]);

    useEffect(resetCalendarVisibleDate, [endCalendarVisible]);

    useEffect(() => {
      return () => {
        animateStartTimeOutRef.current && clearTimeout(animateStartTimeOutRef.current);
        animateEndTimeOutRef.current && clearTimeout(animateEndTimeOutRef.current);
      };
    }, []);

    return (
      <>
        <DatePickerDateRangeField
          {...fieldProps}
          ref={ref}
          startFieldRef={startFieldRef}
          endFieldRef={endFieldRef}
          startFieldOnFocus={startFieldOnFocusHandler}
          endFieldOnFocus={endFieldOnFocusHandler}
          startFieldRightSide={startFieldRightSide || rightSide}
          startFieldLeftSide={startFieldLeftSide || leftSide}
          endFieldRightSide={endFieldRightSide || rightSide}
          endFieldLeftSide={endFieldLeftSide || leftSide}
          startFieldOnBlur={startFieldOnBlurHandler}
          endFieldOnBlur={endFieldOnBlurHandler}
        />
        <DatePickerCalendar
          {...commonProps}
          ref={startCalendarRef}
          anchorRef={startFieldRef}
          isOpen={startCalendarVisible}
          onChangeCurrentVisibleDate={(date) => setStartCalendarVisibleDate(date)}
          currentVisibleDate={startCalendarVisibleDate}
        />
        <DatePickerCalendar
          {...commonProps}
          ref={endCalendarRef}
          anchorRef={endFieldRef}
          isOpen={endCalendarVisible}
          onChangeCurrentVisibleDate={(date) => setEndCalendarVisibleDate(date)}
          currentVisibleDate={endCalendarVisibleDate}
        />
      </>
    );
  },
);
