import './CalendarViewSlider.css';

import React from 'react';
import { addMonths } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cn } from '../../../utils/bem';
import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarMonthLabel } from '../CalendarMonthLabel/CalendarMonthLabel';
import { CalendarSlider } from '../CalendarSlider/CalendarSlider';
import {
  calendarPropTypeDefault,
  CalendarViewComponent,
  getDaysOfMonth,
  getDaysOfWeek,
  getHandleSelectDate,
  getMonthTitle,
  useCurrentVisibleDate,
} from '../helpers';

export const cnCalendarViewSlider = cn('CalendarViewSlider');

export const CalendarViewSlider: CalendarViewComponent = React.forwardRef((props, ref) => {
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
  const monthLabel = getMonthTitle(currentVisibleDate, locale);
  const nextMonthLabel = getMonthTitle(addMonths(currentVisibleDate, 1), locale);
  const daysOfWeek = getDaysOfWeek(locale);

  return (
    <div {...otherProps} ref={ref} className={cnCalendarViewSlider({}, [className])}>
      <CalendarSlider
        className={cnCalendarViewSlider('Slider')}
        currentVisibleDate={currentVisibleDate}
        onChange={setCurrentVisibleDate}
        value={value}
        locale={locale}
      />
      <div className={cnCalendarViewSlider('CalendarsWrapper')}>
        <div className={cnCalendarViewSlider('Calendar')}>
          <CalendarMonthLabel label={monthLabel} />
          <CalendarMonth daysOfWeek={daysOfWeek} daysOfMonth={daysOfMonth} />
        </div>
        <div className={cnCalendarViewSlider('Calendar')}>
          <CalendarMonthLabel label={nextMonthLabel} />
          <CalendarMonth daysOfWeek={daysOfWeek} daysOfMonth={nextDaysOfMonth} />
        </div>
      </div>
    </div>
  );
});
