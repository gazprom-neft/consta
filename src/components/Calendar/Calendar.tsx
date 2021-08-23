import './Calendar.css';

import React from 'react';

import { cn } from '../../utils/bem';
import { getSizeByMap } from '../../utils/getSizeByMap';

import { CalendarViewOneMonth } from './CalendarViewOneMonth/CalendarViewOneMonth';
import { CalendarViewSlider } from './CalendarViewSlider/CalendarViewSlider';
import { CalendarViewTwoMonths } from './CalendarViewTwoMonths/CalendarViewTwoMonths';
import {
  CalendarComponent,
  CalendarPropView,
  calendarPropViewDefault,
  CalendarViewComponent,
} from './helpers';

export const cnCalendar = cn('Calendar');

const viewMap: Record<CalendarPropView, CalendarViewComponent> = {
  oneMonth: CalendarViewOneMonth,
  twoMonths: CalendarViewTwoMonths,
  slider: CalendarViewSlider,
};

export const Calendar: CalendarComponent = React.forwardRef((props, ref) => {
  const { view = calendarPropViewDefault, className, ...otherProps } = props;

  const ViewComponent = getSizeByMap(viewMap, view);

  return <ViewComponent {...otherProps} ref={ref} className={cnCalendar(null, [className])} />;
});

export * from './CalendarCell/CalendarCell';
export * from './CalendarItem/CalendarItem';
export * from './CalendarMonth/CalendarMonth';
export * from './CalendarMonthLabel/CalendarMonthLabel';
export * from './CalendarMonthToggler/CalendarMonthToggler';
export * from './CalendarSlider/CalendarSlider';
export * from './CalendarViewOneMonth/CalendarViewOneMonth';
export * from './CalendarViewSlider/CalendarViewSlider';
export * from './CalendarViewTwoMonths/CalendarViewTwoMonths';
export * from './Calendar10Years/Calendar10Years';
export * from './CalendarYear/CalendarYear';
export * from './CalendarTime/CalendarTime';
