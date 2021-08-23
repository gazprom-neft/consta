import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

export const getMonthTitle = (date: Date): string => {
  return format(date, 'LLLL', { locale: ruLocale });
};

export * from './isInMinMaxDade';
export * from './isDateRange';
export * from './isOnlyOneDateInRange';
