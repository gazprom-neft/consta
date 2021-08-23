import { DateRange } from '../types/Date';

export const isOnlyOneDateInRange = (range: DateRange): boolean => {
  return Boolean((range[0] && !range[1]) || (!range[0] && range[1]));
};
