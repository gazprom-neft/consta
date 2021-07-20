import React from 'react';
import { addMonths } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarMonthToggler } from '../CalendarMonthToggler/CalendarMonthToggler';
import {
  calendarPropTypeDefault,
  CalendarViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMouthLabelWithYear,
  useCurrentVisibleDate,
} from '../helpers';

export const cnCalendarViewOneMonth = cn('CalendarViewOneMonth');

export const CalendarViewOneMonth: CalendarViewComponent = React.forwardRef((props, ref) => {
  const {
    className,
    type = calendarPropTypeDefault,
    minDate,
    maxDate,
    value,
    onChange,
    currentVisibleDate: currentVisibleDateProp,
    events,
    locale = ruLocale,
    onChangeCurrentVisibleDate,
    ...otherProps
  } = props;

  const [currentVisibleDate, setCurrentVisibleDate] = useCurrentVisibleDate({
    currentVisibleDate: currentVisibleDateProp,
    maxDate,
    minDate,
    value,
    onChangeCurrentVisibleDate,
  });

  const handleSelectDate = getHandleSelectDate({ type, minDate, maxDate, value, onChange });
  const daysOfMonth = getDaysOfMonth({
    date: currentVisibleDate,
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const monthLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const daysOfWeek = getDaysOfWeek(locale);
  const nextMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewOneMonth({}, [className])}>
      <CalendarMonthToggler
        prevOnClick={prevMonthHandle}
        nextOnClick={nextMonthHandle}
        label={monthLabel}
      />
      <CalendarMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
    </div>
  );
});
