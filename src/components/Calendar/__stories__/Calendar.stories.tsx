import React, { useState } from 'react';
import { boolean, date, select } from '@storybook/addon-knobs';
import { addDays, endOfYear, Locale, set, startOfWeek, startOfYear } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Calendar, Calendar10Years, CalendarTime, CalendarYear } from '../Calendar';
import {
  calendarPropType,
  calendarPropTypeDefault,
  calendarPropView,
  calendarPropViewDefault,
} from '../helpers';

import mdx from './Calendar.docs.mdx';

const localeProp = ['ru', 'en-US', 'zh-CN', 'es'] as const;
type LocaleProp = typeof localeProp[number];
const localeDefault: LocaleProp = localeProp[0];

const localeMap: Record<LocaleProp, Locale> = {
  'ru': ruLocale,
  'en-US': enUSLocale,
  'zh-CN': zhCNLocale,
  'es': esLocale,
};

const defaultKnobs = () => ({
  type: select('type', calendarPropType, calendarPropTypeDefault),
  view: select('view', calendarPropView, calendarPropViewDefault),
  withEvents: boolean('withEvents', false),
  minDate: date('minDate', startOfYear(new Date())),
  maxDate: date('maxDate', endOfYear(new Date())),
  locale: select('locale', localeProp, localeDefault),
});

export function Playground() {
  const { type, view, withEvents, minDate, maxDate, locale } = defaultKnobs();
  const currentDay = new Date();

  const [value, setValue] = useState<Date | undefined>(undefined);

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  return (
    <Calendar
      type={type}
      value={value}
      view={view}
      onChange={({ value }) => setValue(value)}
      minDate={new Date(minDate)}
      maxDate={new Date(maxDate)}
      events={events}
      locale={getSizeByMap(localeMap, locale)}
    />
  );
}

export const Calendar10YearsStory = createStory(
  () => (
    <Calendar10Years
      years={[
        { label: '2000' },
        { label: '2001' },
        { label: '2002', current: true },
        { label: '2003', selected: true },
        { label: '2004' },
        { label: '2005', range: 'first', selected: true },
        { label: '2006', range: true },
        { label: '2007', range: true },
        { label: '2008', range: true },
        { label: '2010', range: 'last', selected: true },
        { label: '2011' },
        { label: '2012' },
      ]}
    />
  ),
  {
    name: 'Calendar10Years',
  },
);

export const CalendarYearStory = createStory(
  () => (
    <CalendarYear
      years={[
        { label: 'Янв' },
        { label: 'Фев' },
        { label: 'Мар', current: true },
        { label: 'Апр', selected: true },
        { label: 'Май' },
        { label: 'Июн', range: 'first', selected: true },
        { label: 'Июл', range: true },
        { label: 'Авг', range: true },
        { label: 'Сен', range: true },
        { label: 'Окт', range: 'last', selected: true },
        { label: 'Ноя' },
        { label: 'Дек' },
      ]}
    />
  ),
  {
    name: 'CalendarYear',
  },
);

const minDate = set(new Date(), { hours: 2, minutes: 59, seconds: 59 });
const maxDate = set(new Date(), { hours: 18, minutes: 30, seconds: 20 });

export const CalendarTimeStory = createStory(
  () => {
    const [value, setValue] = useState<Date | undefined>(undefined);

    return (
      <CalendarTime
        value={value}
        onChange={({ value }) => setValue(value)}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  },
  {
    name: 'CalendarTime',
  },
);

export default createMetadata({
  title: 'Компоненты/Базовые/Calendar',
  id: 'components/Calendar',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=58%3A33602',
    },
  },
});
