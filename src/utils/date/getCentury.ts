import { getYear } from 'date-fns';

export const getCentury = (date: Date) => {
  const year = getYear(date);
  if (year === 0) {
    return 0;
  }

  if (year > 0) {
    return Math.trunc(year / 100) * 100;
  }

  return Math.floor(year / 100) * 100;
};
