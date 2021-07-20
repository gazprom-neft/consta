import React, { forwardRef, useEffect, useRef, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { setRef } from '../../../utils/setRef';
import { DatePickerCalendar } from '../DatePickerCalendar/DatePickerCalendar';
import { DatePickerDateField } from '../DatePickerDateField/DatePickerDateField';
import { DatePickerTypeDateComponent } from '../helpers';

export const DatePickerTypeDate: DatePickerTypeDateComponent = forwardRef((props, ref) => {
  const {
    events,
    calendarView,
    locale,
    currentVisibleDate: currentVisibleDateProp,
    calendarForm,
    isMobile,
    onFocus,
    ...otherProps
  } = props;

  const fieldRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

  const [currentVisibleDate, setCurrentVisibleDate] = useState<Date | undefined>(
    currentVisibleDateProp,
  );

  const [calendarVisibleDate, setCalendarVisibleDate] = useState<Date | undefined>();

  const onFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
    onFocus && onFocus(e);
    setCalendarVisible(true);
    if (isMobile) {
      e.target.blur();
    }
  };

  useEffect(() => {
    if (ref) {
      setRef(ref, fieldRef.current);
    }
  }, [ref, fieldRef]);

  useEffect(() => {
    if (props.value && props.calendarView === 'oneMonth' && calendarVisibleDate) {
      const newVisibleDate = startOfMonth(props.value);
      if (newVisibleDate.getTime() !== calendarVisibleDate.getTime()) {
        setCurrentVisibleDate(newVisibleDate);
      }
      return;
    }
    if (props.value && props.calendarView !== 'oneMonth' && calendarVisibleDate) {
      const newVisibleDate = startOfMonth(props.value);
      if (
        newVisibleDate.getTime() !== calendarVisibleDate.getTime() &&
        newVisibleDate.getTime() !== addMonths(calendarVisibleDate, 1).getTime()
      ) {
        setCurrentVisibleDate(newVisibleDate);
      }
    }
  }, [props.value]);

  useClickOutside({
    isActive: calendarVisible,
    ignoreClicksInsideRefs: [fieldRef, calendarRef],
    handler: () => {
      setCalendarVisible(false);
      setCurrentVisibleDate(undefined);
    },
  });

  return (
    <>
      <DatePickerDateField {...otherProps} ref={fieldRef} onFocus={onFocusHandler} />
      <DatePickerCalendar
        isMobile={isMobile}
        ref={calendarRef}
        anchorRef={fieldRef}
        isOpen={calendarVisible}
        value={props.value || undefined}
        type={props.type}
        view={calendarView}
        events={events}
        locale={locale}
        minDate={props.minDate}
        maxDate={props.maxDate}
        currentVisibleDate={currentVisibleDate}
        form={calendarForm}
        onChange={props.onChange}
        onChangeCurrentVisibleDate={(date) => setCalendarVisibleDate(date)}
      />
    </>
  );
});
