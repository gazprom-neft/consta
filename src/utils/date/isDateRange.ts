import { isDefined } from '../type-guards';
import { DateRange } from '../types/Date';

export const isDateRange: (value?: Date | DateRange) => value is DateRange = (
  value,
): value is DateRange =>
  Array.isArray(value) &&
  value.length === 2 &&
  value.every((date) => date instanceof Date || !isDefined(date));
