import './CalendarYear.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { CalendarCellProps } from '../CalendarCell/CalendarCell';
import { CalendarGrid } from '../CalendarGrid/CalendarGrid';
import { CalendarItemProps } from '../CalendarItem/CalendarItem';

export type CalendarYearProps = PropsWithJsxAttributes<
  {
    children?: never;
    years: Omit<CalendarItemProps & CalendarCellProps, 'ref'>[];
  },
  'div'
>;

export const cnCalendarYear = cn('CalendarYear');

export const CalendarYear: React.FC<CalendarYearProps> = (props) => {
  const { className, years, ...otherProps } = props;

  return (
    <CalendarGrid {...otherProps} className={cnCalendarYear(null, [className])} items={years} />
  );
};
