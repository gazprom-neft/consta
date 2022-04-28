import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { addMonths, startOfYear } from 'date-fns';

import { useClickOutside } from '../../../hooks/useClickOutside/useClickOutside';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { setRef } from '../../../utils/setRef';
import { DatePickerDropdown } from '../DatePickerDropdown/DatePickerDropdown';
import { DatePickerFieldTypeMonth } from '../DatePickerFieldTypeMonth/DatePickerFieldTypeMonth';
import { DatePickerTypeComponent } from '../types';
import { useCurrentVisibleDate } from '../useCurrentVisibleDate';

export const DatePickerTypeMonth: DatePickerTypeComponent<'month'> = forwardRef((props, ref) => {
  const {
    events,
    dateTimeView,
    locale,
    dropdownForm,
    onFocus,
    currentVisibleDate: currentVisibleDateProp,
    onChangeCurrentVisibleDate: onChangeCurrentVisibleDateProp,
    renderAdditionalControls,
    style,
    ...otherProps
  } = props;

  const fieldRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendarVisible, setCalendarVisible] = useFlag(false);

  const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate(
    currentVisibleDateProp,
    onChangeCurrentVisibleDateProp,
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

  useEffect(() => {
    if (props.value && props.dateTimeView === 'classic' && calendarVisibleDate) {
      const newVisibleDate = startOfYear(props.value);
      if (newVisibleDate.getTime() !== calendarVisibleDate.getTime()) {
        setCurrentVisibleDate(newVisibleDate);
      }
      return;
    }
    if (props.value && props.dateTimeView !== 'classic' && calendarVisibleDate) {
      const newVisibleDate = startOfYear(props.value);
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
    setCurrentVisibleDate(props.value ? undefined : currentVisibleDateProp);
  };

  useClickOutside({
    isActive: calendarVisible,
    ignoreClicksInsideRefs: [fieldRef, calendarRef],
    handler: handleClose,
  });

  return (
    <>
      <DatePickerFieldTypeMonth
        {...otherProps}
        ref={fieldRef}
        onFocus={onFocusHandler}
        style={style}
      />
      <DatePickerDropdown
        ref={calendarRef}
        anchorRef={fieldRef}
        isOpen={calendarVisible}
        value={props.value || undefined}
        type="month"
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
        renderAdditionalControls={renderAdditionalControls}
        zIndex={typeof style?.zIndex === 'number' ? style.zIndex + 1 : undefined}
        onChangeCurrentVisibleDate={setCalendarVisibleDate}
      />
    </>
  );
});
