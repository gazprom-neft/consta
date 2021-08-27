import { getCentury } from './getCentury';

export const endOfCentury = (date: Date) => new Date(getCentury(date) + 99, 11, 1, 23, 59, 59, 999);
