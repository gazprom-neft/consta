import './CalendarViewTwoMonths.css';

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

export const cnCalendarViewTwoMonths = cn('CalendarViewTwoMonths');

export const CalendarViewTwoMonths: CalendarViewComponent = React.forwardRef((props, ref) => {
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

  const nextDaysOfMonth = getDaysOfMonth({
    date: addMonths(currentVisibleDate, 1),
    handleDayClick: handleSelectDate,
    value,
    events,
    minDate,
    maxDate,
    locale,
  });

  const monthLabel = getMouthLabelWithYear(currentVisibleDate, locale);
  const nextMonthLabel = getMouthLabelWithYear(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  const nextMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, 1));
  const prevMonthHandle = () => setCurrentVisibleDate(addMonths(currentVisibleDate, -1));

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewTwoMonths({}, [className])}>
      <div className={cnCalendarViewTwoMonths('Calendar')}>
        <CalendarMonthToggler prevOnClick={prevMonthHandle} label={monthLabel} />
        <CalendarMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
      </div>
      <div className={cnCalendarViewTwoMonths('Calendar')}>
        <CalendarMonthToggler nextOnClick={nextMonthHandle} label={nextMonthLabel} />
        <CalendarMonth daysOfWeek={daysOfWeek} daysOfMonth={nextDaysOfMonth} />
      </div>
    </div>
  );
});
