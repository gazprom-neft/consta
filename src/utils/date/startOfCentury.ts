import { getCentury } from './getCentury';

export const startOfCentury = (date: Date) => {
  const century = getCentury(date);
  if (century === 0) {
    return new Date('0000-01-01T00:00:00');
  }
  return new Date(century, 0, 1, 0, 0, 0, 0);
};
