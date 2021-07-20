import React, { useEffect, useState } from 'react';
import { boolean, date, select, text } from '@storybook/addon-knobs';
import { addDays, Locale, startOfWeek } from 'date-fns';
import enUSLocale from 'date-fns/locale/en-US';
import esLocale from 'date-fns/locale/es';
import ruLocale from 'date-fns/locale/ru';
import zhCNLocale from 'date-fns/locale/zh-CN';

import { IconCalendar } from '../../../icons/IconCalendar/IconCalendar';
import { maxDateDefault, minDateDefault } from '../../../utils/date';
import { getSizeByMap } from '../../../utils/getSizeByMap';
import { createMetadata } from '../../../utils/storybook';
import {
  calendarPropType,
  calendarPropTypeDefault,
  calendarPropView,
  calendarPropViewDefault,
} from '../../Calendar/helpers';
import {
  textFieldPropForm,
  textFieldPropFormDefault,
  textFieldPropSize,
  textFieldPropSizeDefault,
  textFieldPropState,
  textFieldPropView,
  textFieldPropViewDefault,
} from '../../TextField/TextField';
import { DatePicker } from '../DatePicker';
import {
  datePickerPropCalendarForm,
  datePickerPropCalendarFormDefault,
  datePickerPropFormatDefault,
  datePickerPropPlaceholderDefault,
  datePickerPropSeparatorDefault,
  DatePickerPropValue,
} from '../helpers';

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
  form: select('form', textFieldPropForm, textFieldPropFormDefault),
  state: select('state', ['', ...textFieldPropState], ''),
  size: select('size', textFieldPropSize, textFieldPropSizeDefault),
  view: select('view', textFieldPropView, textFieldPropViewDefault),
  disabled: boolean('disabled', false),
  placeholder: text('placeholder', datePickerPropPlaceholderDefault),
  leftSideType: select('leftSideType', ['icon', 'text', 'false'], 'false'),
  leftSideText: text('leftSideText', 'from'),
  rightSideType: select('rightSideType', ['icon', 'text', 'false'], 'false'),
  rightSideText: text('rightSideText', 'text'),
  minDate: date('minDate', minDateDefault),
  maxDate: date('maxDate', maxDateDefault),
  format: text('format', datePickerPropFormatDefault),
  separator: text('separator', datePickerPropSeparatorDefault),
  withEvents: boolean('withEvents', false),
  locale: select('locale', localeProp, localeDefault),
  calendarView: select('calendarView', calendarPropView, calendarPropViewDefault),
  calendarForm: select(
    'calendarForm',
    datePickerPropCalendarForm,
    datePickerPropCalendarFormDefault,
  ),
  isMobile: boolean('isMobile', false),
});

export function Playground() {
  const {
    form,
    state,
    size,
    view,
    placeholder,
    leftSideType,
    leftSideText,
    rightSideType,
    rightSideText,
    disabled,
    withEvents,
    locale,
    calendarView,
    format,
    separator,
    calendarForm,
    type,
    isMobile,
  } = defaultKnobs();

  const [value, setValue] = useState<DatePickerPropValue<typeof type>>(null);

  const currentDay = new Date();

  const leftSideSelect = {
    text: leftSideText,
    icon: IconCalendar,
    false: undefined,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconCalendar,
    false: undefined,
  };

  const events = withEvents
    ? [startOfWeek(currentDay, { locale: ruLocale }), currentDay, addDays(currentDay, 2)]
    : undefined;

  const leftSide = leftSideSelect[leftSideType];
  const rightSide = rightSideSelect[rightSideType];

  useEffect(() => {
    setValue(null);
  }, [type]);

  return (
    <div style={{ maxWidth: 500 }}>
      <DatePicker
        type={type}
        width="full"
        form={form}
        value={value}
        state={state || undefined}
        view={view}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        onChange={({ value }) => setValue(value)}
        leftSide={leftSide}
        rightSide={rightSide}
        events={events}
        locale={getSizeByMap(localeMap, locale)}
        calendarView={calendarView}
        format={format}
        separator={separator}
        calendarForm={calendarForm}
        isMobile={isMobile}
      />
    </div>
  );
}

export default createMetadata({
  title: 'Компоненты|/Базовые/DatePicker(Canary)',
  id: 'components/DatePickerCanary',
});
