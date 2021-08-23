import { isWithinInterval } from 'date-fns';

export const isInMinMaxDade = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  if (!minDate && !maxDate) {
    return true;
  }

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
