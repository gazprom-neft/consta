import { useMemo } from 'react';
import {
  addHours,
  addMinutes,
  addSeconds,
  format,
  setHours,
  setMinutes,
  setSeconds,
  startOfToday,
} from 'date-fns';

import { range } from '../../../utils/array';
import { isInMinMaxDade } from '../../../utils/date';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';

type CalendarTimePropLocale = {
  hours: string;
  minutes: string;
  seconds: string;
};

export const calendarTimePropLocaleDefault: CalendarTimePropLocale = {
  hours: 'Часы',
  minutes: 'Мин.',
  seconds: 'Сек.',
};

type CalendarTimePropOnChange = (props: { e: React.MouseEvent; value: Date }) => void;

type ResultItem = {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  selected?: boolean;
};

export type CalendarTimeProps = PropsWithJsxAttributes<
  {
    children?: never;
    value?: Date;
    onChange?: CalendarTimePropOnChange;
    maxDate?: Date;
    minDate?: Date;
    multiplicitySeconds?: number;
    multiplicityMinutes?: number;
    multiplicityHours?: number;
    locale?: CalendarTimePropLocale;
  },
  'div'
>;

const getLabelHours = (date: Date) => format(date, 'HH');
const getLabelMinutes = (date: Date) => format(date, 'mm');
const getLabelSeconds = (date: Date) => format(date, 'ss');

const startOfDay = (date: Date) => setHours(date, 0);
const startOfHour = (date: Date) => setMinutes(date, 0);
const startOfMinute = (date: Date) => setSeconds(date, 0);

const useItemData = (
  length: number,
  multiplicity = 1,
  startOfUnit: typeof startOfDay,
  addUnits: typeof addHours,
  getItemLabel: (date: Date) => string,
  value?: Date,
  minDate?: Date,
  maxDate?: Date,
  onChange?: CalendarTimePropOnChange,
): ResultItem[] => {
  const numbers = useMemo(() => range(multiplicity ? Math.floor(length / multiplicity) : 0), [
    length,
    multiplicity,
  ]);

  if (numbers.length === 0) {
    return [];
  }

  const startDate = startOfUnit(value || startOfToday());

  return numbers.map((number) => {
    const date = addUnits(startDate, number * multiplicity);
    const label = getItemLabel(date);
    const selected = value ? getItemLabel(date) === getItemLabel(value) : false;
    const disabled = !isInMinMaxDade(date, minDate, maxDate);
    const onClick =
      onChange && !disabled && !selected
        ? (e: React.MouseEvent) => onChange({ e, value: date })
        : undefined;

    return {
      label,
      selected,
      disabled,
      onClick,
    };
  });
};

export const useTimeItems = (
  value?: Date,
  multiplicityHours?: number,
  multiplicityMinutes?: number,
  multiplicitySeconds?: number,
  onChange?: CalendarTimePropOnChange,
  minDate?: Date,
  maxDate?: Date,
): ResultItem[][] => {
  return [
    useItemData(
      24,
      multiplicityHours,
      startOfDay,
      addHours,
      getLabelHours,
      value,
      minDate,
      maxDate,
      onChange,
    ),
    useItemData(
      60,
      multiplicityMinutes,
      startOfHour,
      addMinutes,
      getLabelMinutes,
      value,
      minDate,
      maxDate,
      onChange,
    ),
    useItemData(
      60,
      multiplicitySeconds,
      startOfMinute,
      addSeconds,
      getLabelSeconds,
      value,
      minDate,
      maxDate,
      onChange,
    ),
  ];
};
