import setYear from 'date-fns/setYear';

import { isDefined } from '../type-guards';
import { DateRange } from '../types/Date';

export const leapYear = 2020;

export const dateComparer = (a?: Date, b?: Date): number =>
  (a?.getTime() ?? 0) - (b?.getTime() ?? 0);

export const getStartAndEndDate = (date1: Date, date2: Date): Date[] =>
  [date1, date2].sort(dateComparer);

export const isDateRange: (value?: Date | DateRange) => value is DateRange = (
  value,
): value is DateRange =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every((date) => date instanceof Date || !isDefined(date));

export const isOnlyOneDateInRange = (range: DateRange): boolean => {
  return Boolean((range[0] && !range[1]) || (!range[0] && range[1]));
};

export const minDateDefault = setYear(new Date(1970, 0, 1, 0, 0, 0, 0), 1);
export const maxDateDefault = new Date(9999, 11, 31, 23, 59, 59);
