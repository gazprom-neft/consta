import './CalendarCell.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';

export const calendarCellPropRange = ['first', 'last', true, false] as const;
export type CalendarCellPropRange = typeof calendarCellPropRange[number];

export type CalendarCellProps = PropsWithJsxAttributes<
  {
    range?: CalendarCellPropRange;
  },
  'div'
>;

export const cnCalendarCell = cn('CalendarCell');

export const CalendarCell: React.FC<CalendarCellProps> = (props) => {
  const { range, children, className, ...otherProps } = props;

  return (
    <div {...otherProps} className={cnCalendarCell({ range }, [className])}>
      {children}
    </div>
  );
};
