import React, { forwardRef, useEffect, useRef, useState } from 'react';
import addMonths from 'date-fns/addMonths';
import startOfMonth from 'date-fns/startOfMonth';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeDate } from '../DatePickerFieldTypeDate/DatePickerFieldTypeDate';
import { DatePickerTypeComponent } from '../helpers';

export const DatePickerTypeDate: DatePickerTypeComponent<'date'> = forwardRef((props, ref) => {
  const {
    events,
    dateTimeView,
    locale,
    dropdownForm,
    onFocus,
    currentVisibleDate: currentVisibleDateProp,
    onChangeCurrentVisibleDate: onChangeCurrentVisibleDateProp,
    ...otherProps
  } = props;

  const fieldRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendarVisible, setCalendarVisible] = useFlag(false);

  const [currentVisibleDate, setCurrentVisibleDate] = useState<Date | undefined>(
    currentVisibleDateProp,
  );

  const [calendarVisibleDate, setCalendarVisibleDate] = useState<Date | undefined>();

  const onFocusHandler = (e: React.FocusEvent<HTMLElement>) => {
    onFocus && onFocus(e);
    setCalendarVisible.on();
  };

  useEffect(() => {
    if (ref) {
      setRef(ref, fieldRef.current);
    }
  }, [ref, fieldRef]);

  useEffect(() => setCurrentVisibleDate(currentVisibleDateProp), [
    currentVisibleDateProp?.getTime(),
  ]);

  useEffect(() => currentVisibleDate && onChangeCurrentVisibleDateProp?.(currentVisibleDate), [
    currentVisibleDate?.getTime(),
  ]);

  useEffect(() => {
    if (props.value && props.dateTimeView === 'classic' && calendarVisibleDate) {
      const newVisibleDate = startOfMonth(props.value);
      if (newVisibleDate.getTime() !== calendarVisibleDate.getTime()) {
        setCurrentVisibleDate(newVisibleDate);
      }
      return;
    }
    if (props.value && props.dateTimeView !== 'classic' && calendarVisibleDate) {
      const newVisibleDate = startOfMonth(props.value);
      if (
        newVisibleDate.getTime() !== calendarVisibleDate.getTime() &&
        newVisibleDate.getTime() !== addMonths(calendarVisibleDate, 1).getTime()
      ) {
        setCurrentVisibleDate(newVisibleDate);
      }
    }
  }, [props.value]);

  const handleClose = () => {
    setCalendarVisible.off();
    setCurrentVisibleDate(undefined);
  };

  useClickOutside({
    isActive: calendarVisible,
    ignoreClicksInsideRefs: [fieldRef, calendarRef],
    handler: handleClose,
  });

  return (
    <>
      <DatePickerFieldTypeDate {...otherProps} ref={fieldRef} onFocus={onFocusHandler} />
      <DatePickerDropdown
        ref={calendarRef}
        anchorRef={fieldRef}
        isOpen={calendarVisible}
        value={props.value || undefined}
        type="date"
        view={dateTimeView}
        events={events}
        locale={locale}
        minDate={props.minDate}
        maxDate={props.maxDate}
        currentVisibleDate={currentVisibleDate}
        form={dropdownForm}
        onChange={(params) => {
          props.onChange?.(params);
          handleClose();
        }}
        renderAdditionalControls={props.renderAdditionalControls}
        onChangeCurrentVisibleDate={setCalendarVisibleDate}
      />
    </>
  );
});
