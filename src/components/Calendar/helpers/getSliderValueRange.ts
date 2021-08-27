import { DateRange } from '../../../utils/types/Date';

type StartEndOfPeriod = (date: Date) => Date;

const inProcent = (number: number, msInPeriod: number) => (number / msInPeriod) * 100;

export const getSliderValueRange = (
  decadeDate: Date,
  value: Date | DateRange | undefined,
  startOfPeriod: StartEndOfPeriod,
  endOfPeriod: StartEndOfPeriod,
) => {
  if (!Array.isArray(value) || !value[0] || !value[1]) {
    return undefined;
  }

  const periodStartDateTime = startOfPeriod(decadeDate).getTime();
  const periodEndDateTime = endOfPeriod(decadeDate).getTime();
  const valueStartDateTime = value[0].getTime();
  const valueEndDateTime = value[1].getTime();

  if (valueStartDateTime > periodEndDateTime || valueEndDateTime < periodStartDateTime) {
    return undefined;
  }

  if (valueStartDateTime <= periodStartDateTime && valueEndDateTime >= periodEndDateTime) {
    return [0, 100];
  }

  const msInPeriod = periodEndDateTime - periodStartDateTime;

  const offset = Math.floor(
    inProcent(
      valueStartDateTime <= periodStartDateTime ? 0 : valueStartDateTime - periodStartDateTime,
      msInPeriod,
    ),
  );

  const width = Math.ceil(
    valueEndDateTime >= periodEndDateTime
      ? 100 - offset
      : inProcent(
          valueEndDateTime -
            (valueStartDateTime <= periodStartDateTime ? periodStartDateTime : valueStartDateTime),
          msInPeriod,
        ),
  );

  return [offset, width];
};
