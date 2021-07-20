import React, { useEffect, useMemo, useState } from 'react';
import {
  addDays,
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  Locale,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';

import { range } from '../../utils/array';
import { getStartAndEndDate, isDateRange, isOnlyOneDateInRange } from '../../utils/date';
import { isDefined } from '../../utils/type-guards';
import { DateRange } from '../../utils/types/Date';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

import { CalendarCellPropRange } from './CalendarСell/CalendarСell';

export const calendarPropView = ['oneMonth', 'twoMonths', 'slider'] as const;
export type CalendarPropView = typeof calendarPropView[number];
export const calendarPropViewDefault: CalendarPropView = calendarPropView[0];

export const calendarPropType = ['date', 'date-range'] as const;
export type CalendarPropType = typeof calendarPropType[number];
export const calendarPropTypeDefault: CalendarPropType = calendarPropType[0];

export type CalendarPropValue<TYPE extends CalendarPropType> = TYPE extends 'date'
  ? Date
  : DateRange;

export type CalendarPropOnChange<TYPE extends CalendarPropType> = (props: {
  value: CalendarPropValue<TYPE>;
  e: React.MouseEvent<HTMLDivElement>;
}) => void;

export type CalendarProps<TYPE extends CalendarPropType = 'date'> = PropsWithHTMLAttributesAndRef<
  {
    currentVisibleDate?: Date;
    type?: TYPE;
    value?: CalendarPropValue<TYPE>;
    onChange?: CalendarPropOnChange<TYPE>;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: CalendarPropView;
    locale?: Locale;
    children?: never;
    onChangeCurrentVisibleDate?: (date: Date) => void;
  },
  HTMLDivElement
>;

export type CalendarComponent = <TYPE extends CalendarPropType = 'date'>(
  props: CalendarProps<TYPE>,
) => React.ReactElement | null;

export type CalendarViewComponent = <TYPE extends CalendarPropType>(
  props: Omit<CalendarProps<TYPE>, 'view'>,
) => React.ReactElement | null;

const isEqualDate = (date1: Date, date2: Date): boolean => date1.getTime() === date2.getTime();

const isEqualDay = (date1: Date, date2: Date): boolean =>
  isEqualDate(startOfDay(date1), startOfDay(date2));

export const isDateSelected = ({ date, value }: { date: Date; value?: Date }): boolean => {
  return value ? isSameDay(value, date) : false;
};

export const isValueSelected = ({
  date,
  value,
}: {
  date: Date;
  value?: Date | DateRange;
}): boolean => {
  if (isDateRange(value)) {
    if (value[0] && value[1]) {
      const [start, end] = getStartAndEndDate(value[0], value[1]);
      return isWithinInterval(date, { start, end });
    }

    return isDateSelected({ date, value: value[0] || value[1] });
  }
  return isDateSelected({ date, value });
};

export const isValueSelectedBackwards = ({
  value,
  hoveredDate,
}: {
  value?: Date | DateRange;
  hoveredDate?: Date;
}): boolean | undefined => {
  return (
    hoveredDate &&
    isDateRange(value) &&
    isOnlyOneDateInRange(value) &&
    ((isDefined(value[0]) && isBefore(hoveredDate, value[0])) ||
      (isDefined(value[1]) && isBefore(hoveredDate, value[1])))
  );
};

const isSelected = ({ date, value }: { date: Date; value?: Date | DateRange }): boolean => {
  if (!value) {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((item) => (item ? isEqualDay(date, item) : false));
  }

  return isEqualDay(date, value);
};

const isDateInRange = (date: Date, range: DateRange): CalendarCellPropRange => {
  if (!range[0] || !range[1]) {
    return false;
  }

  const dateTime = date.getTime();
  const rangeTime = [range[0].getTime(), range[1].getTime()];

  if (dateTime === rangeTime[0]) {
    return 'first';
  }

  if (dateTime === rangeTime[1]) {
    return 'last';
  }

  if (dateTime > rangeTime[0] && dateTime < rangeTime[1]) {
    return true;
  }

  return false;
};

const hasEvent = (date: Date, events: Date[]): boolean =>
  !!events.find((eventDate) => isEqualDay(eventDate, date));

const isToday = (date: Date): boolean => isEqualDay(new Date(), date);

const isWithInIntervalMinMaxDade = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  const minDateTime = minDate?.getTime();
  const maxDateTime = maxDate?.getTime();

  if (minDate && maxDate && minDateTime && maxDateTime) {
    return minDateTime < maxDateTime
      ? isWithinInterval(date, { start: minDate, end: maxDate })
      : false;
  }

  const dateTime = date.getTime();

  if (minDateTime && !maxDateTime) {
    return minDateTime < dateTime;
  }

  if (!minDateTime && maxDateTime) {
    return maxDateTime > dateTime;
  }

  return true;
};

export const getDaysOfMonth = (props: {
  date: Date;
  locale: Locale;
  handleDayClick?: HandleSelectDate;
  value?: Date | DateRange;
  events?: Date[];
  minDate?: Date;
  maxDate?: Date;
}): {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  number: string;
  selected?: boolean;
  range?: CalendarCellPropRange;
  event?: boolean;
  today?: boolean;
}[] => {
  const { date, locale, handleDayClick, value, events, minDate, maxDate } = props;
  const currentMonth = date.getMonth();
  const startDate = startOfWeek(startOfMonth(date), { locale });
  const endDate = endOfWeek(endOfMonth(date), { locale });
  const diffDays = differenceInDays(endDate, startDate) + 1;

  return range(diffDays).map((index) => {
    const date = addDays(startDate, index);
    const number = format(date, 'd');

    if (date.getMonth() === currentMonth) {
      return {
        number,
        onClick: handleDayClick
          ? (e: React.MouseEvent<HTMLDivElement>) => handleDayClick({ e, value: date })
          : undefined,
        selected: isSelected({ date, value }),
        range: Array.isArray(value) && isDateInRange(date, value),
        event: events && hasEvent(date, events),
        today: isToday(date),
        disabled: !isWithInIntervalMinMaxDade(date, minDate, maxDate),
      };
    }

    return {
      number,
      disabled: true,
    };
  });
};

type GetHandleSelectDateProps<TYPE extends CalendarPropType> = {
  type: TYPE;
  value?: CalendarPropValue<TYPE>;
  onChange?: CalendarPropOnChange<TYPE>;
  minDate?: Date;
  maxDate?: Date;
};

type HandleSelectDate = (props: { value: Date; e: React.MouseEvent<HTMLDivElement> }) => void;

const isDateRangeParams = (
  params: GetHandleSelectDateProps<CalendarPropType>,
): params is GetHandleSelectDateProps<'date-range'> => {
  return params.type === calendarPropType[1];
};

const isNotDateRangeParams = (
  params: GetHandleSelectDateProps<CalendarPropType>,
): params is GetHandleSelectDateProps<'date'> => {
  return params.type === calendarPropType[0];
};

export function getHandleSelectDate<TYPE extends CalendarPropType>(
  params: GetHandleSelectDateProps<TYPE>,
): HandleSelectDate {
  if (isDateRangeParams(params)) {
    const currentValue: DateRange = params.value || [undefined, undefined];

    return ({ value: date, e }) => {
      if (
        params.minDate &&
        params.maxDate &&
        !isWithinInterval(date, { start: params.minDate, end: params.maxDate })
      ) {
        return;
      }

      if (!isOnlyOneDateInRange(currentValue) && typeof params.onChange === 'function') {
        return params.onChange({ e, value: [date, undefined] });
      }

      const [startDate, endDate] = currentValue;

      if (
        (isDefined(startDate) && isEqualDay(startDate, date)) ||
        (isDefined(endDate) && isEqualDay(endDate, date))
      ) {
        return;
      }

      if (isDefined(startDate) && typeof params.onChange === 'function') {
        return params.onChange({
          e,
          value: startDate > date ? [date, startDate] : [startDate, date],
        });
      }

      if (isDefined(endDate) && typeof params.onChange === 'function') {
        return params.onChange({ e, value: endDate > date ? [date, endDate] : [endDate, date] });
      }
    };
  }

  if (isNotDateRangeParams(params)) {
    return (props) => {
      if (!isWithInIntervalMinMaxDade(props.value, params.minDate, params.maxDate)) {
        return;
      }
      if (typeof params.onChange === 'function') {
        return params.onChange(props);
      }
    };
  }

  return () => undefined;
}

export const getMonthTitle = (date: Date, locale: Locale): string => {
  return format(date, 'LLLL', { locale });
};

export const getMouthLabelWithYear = (date: Date, locale: Locale): string => {
  return `${getMonthTitle(date, locale)} ${date.getFullYear()}`;
};

export const getDaysOfWeek = (locale: Locale): string[] => {
  const now = new Date();
  return eachDayOfInterval({
    start: startOfWeek(now, { locale }),
    end: endOfWeek(now, { locale }),
  }).map((date) => format(date, 'EEEEEE', { locale }));
};

type GetCurrentVisibleDateProps = {
  currentVisibleDate: Date | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  value: Date | DateRange | undefined;
  onChangeCurrentVisibleDate?: (date: Date) => void;
};

const getCurrentVisibleDate = ({
  currentVisibleDate,
  minDate,
  maxDate,
  value,
}: GetCurrentVisibleDateProps): Date => {
  const currentDate = new Date();
  if (currentVisibleDate) {
    return currentVisibleDate;
  }
  if (Array.isArray(value) && value[0]) {
    return value[0];
  }
  if (Array.isArray(value) && value[1]) {
    return value[1];
  }
  if (value && !Array.isArray(value)) {
    return value;
  }

  if (minDate && maxDate && !isDateInRange(currentDate, [minDate, maxDate])) {
    return minDate;
  }
  if (minDate && !maxDate) {
    const minDateTime = minDate.getTime();
    const currentDateTime = currentDate.getTime();
    if (currentDateTime < minDateTime) {
      return minDate;
    }
  }
  if (!minDate && maxDate) {
    const maxDateTime = maxDate.getTime();
    const currentDateTime = currentDate.getTime();
    if (currentDateTime > maxDateTime) {
      return maxDate;
    }
  }

  return currentDate;
};

export const useCurrentVisibleDate = (props: GetCurrentVisibleDateProps) => {
  const currentVisibleDate = useMemo(() => {
    return startOfMonth(getCurrentVisibleDate(props));
  }, [
    props.currentVisibleDate?.getTime() || 0,
    props.minDate?.getTime() || 0,
    props.maxDate?.getTime() || 0,
  ]);

  const state = useState(currentVisibleDate);

  useEffect(() => state[1](currentVisibleDate), [currentVisibleDate.getTime()]);

  useEffect(() => props.onChangeCurrentVisibleDate?.(state[0]), [state[0].getTime()]);

  return state;
};
