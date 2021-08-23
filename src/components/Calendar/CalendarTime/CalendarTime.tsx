import './CalendarTime.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { CalendarTimeColumn } from '../CalendarTimeColumn/CalendarTimeColumn';

import { calendarTimePropLocaleDefault, CalendarTimeProps, useTimeItems } from './helpers';

export const cnCalendarTime = cn('CalendarTime');

export const CalendarTime: React.FC<CalendarTimeProps> = (props) => {
  const {
    className,
    value,
    onChange,
    maxDate,
    minDate,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    locale = calendarTimePropLocaleDefault,
    ...otherProps
  } = props;

  const [hours, minutes, seconds] = useTimeItems(
    value,
    multiplicityHours,
    multiplicityMinutes,
    multiplicitySeconds,
    onChange,
    minDate,
    maxDate,
  );

  return (
    <div {...otherProps} className={cnCalendarTime(null, [className])}>
      <CalendarTimeColumn label={locale.hours} items={hours} />
      <CalendarTimeColumn label={locale.minutes} items={minutes} />
      <CalendarTimeColumn label={locale.seconds} items={seconds} />
    </div>
  );
};
