import './Calendar10Years.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { CalendarCellProps } from '../CalendarCell/CalendarCell';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { CalendarItemProps } from '../CalendarItem/CalendarItem';

export type Calendar10YearsProps = PropsWithJsxAttributes<
  {
    children?: never;
    years: Omit<CalendarItemProps & CalendarCellProps, 'ref'>[];
  },
  'div'
>;

export const cnCalendar10Years = cn('Calendar10Years');

export const Calendar10Years: React.FC<Calendar10YearsProps> = (props) => {
  const { className, years, ...otherProps } = props;

  return (
    <CalendarGrid {...otherProps} className={cnCalendar10Years(null, [className])} items={years} />
  );
};
