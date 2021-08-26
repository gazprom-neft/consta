import enUSLocale from 'date-fns/locale/en-US';
import ruLocale from 'date-fns/locale/ru';

import { getDaysOfMonth } from '../helpers';

describe('getDaysOfMonth', () => {
  it('верный результат c date', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
    });

    const expected: typeof result = [
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, current: false, disabled: false },
      { label: '2', selected: false, range: false, current: false, disabled: false },
      { label: '3', selected: false, range: false, current: false, disabled: false },
      { label: '4', selected: false, range: false, current: false, disabled: false },
      { label: '5', selected: false, range: false, current: false, disabled: false },
      { label: '6', selected: false, range: false, current: false, disabled: false },
      { label: '7', selected: false, range: false, current: false, disabled: false },
      { label: '8', selected: false, range: false, current: false, disabled: false },
      { label: '9', selected: false, range: false, current: false, disabled: false },
      { label: '10', selected: false, range: false, current: false, disabled: false },
      { label: '11', selected: false, range: false, current: false, disabled: false },
      { label: '12', selected: false, range: false, current: false, disabled: false },
      { label: '13', selected: false, range: false, current: false, disabled: false },
      { label: '14', selected: false, range: false, current: false, disabled: false },
      { label: '15', selected: false, range: false, current: false, disabled: false },
      { label: '16', selected: false, range: false, current: false, disabled: false },
      { label: '17', selected: false, range: false, current: false, disabled: false },
      { label: '18', selected: false, range: false, current: false, disabled: false },
      { label: '19', selected: false, range: false, current: false, disabled: false },
      { label: '20', selected: false, range: false, current: false, disabled: false },
      { label: '21', selected: false, range: false, current: false, disabled: false },
      { label: '22', selected: false, range: false, current: false, disabled: false },
      { label: '23', selected: false, range: false, current: false, disabled: false },
      { label: '24', selected: false, range: false, current: false, disabled: false },
      { label: '25', selected: false, range: false, current: false, disabled: false },
      { label: '26', selected: false, range: false, current: false, disabled: false },
      { label: '27', selected: false, range: false, current: false, disabled: false },
      { label: '28', selected: false, range: false, current: false, disabled: false },
      { label: '29', selected: false, range: false, current: false, disabled: false },
      { label: '30', selected: false, range: false, current: false, disabled: false },
      { label: '31', selected: false, range: false, current: false, disabled: false },
      { label: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с minDate и maxDate', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      minDate: new Date(1970, 0, 3),
      maxDate: new Date(1970, 0, 4),
    });

    const expected: typeof result = [
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, current: false, disabled: true },
      { label: '2', selected: false, range: false, current: false, disabled: true },
      { label: '3', selected: false, range: false, current: false, disabled: false },
      { label: '4', selected: false, range: false, current: false, disabled: false },
      { label: '5', selected: false, range: false, current: false, disabled: true },
      { label: '6', selected: false, range: false, current: false, disabled: true },
      { label: '7', selected: false, range: false, current: false, disabled: true },
      { label: '8', selected: false, range: false, current: false, disabled: true },
      { label: '9', selected: false, range: false, current: false, disabled: true },
      { label: '10', selected: false, range: false, current: false, disabled: true },
      { label: '11', selected: false, range: false, current: false, disabled: true },
      { label: '12', selected: false, range: false, current: false, disabled: true },
      { label: '13', selected: false, range: false, current: false, disabled: true },
      { label: '14', selected: false, range: false, current: false, disabled: true },
      { label: '15', selected: false, range: false, current: false, disabled: true },
      { label: '16', selected: false, range: false, current: false, disabled: true },
      { label: '17', selected: false, range: false, current: false, disabled: true },
      { label: '18', selected: false, range: false, current: false, disabled: true },
      { label: '19', selected: false, range: false, current: false, disabled: true },
      { label: '20', selected: false, range: false, current: false, disabled: true },
      { label: '21', selected: false, range: false, current: false, disabled: true },
      { label: '22', selected: false, range: false, current: false, disabled: true },
      { label: '23', selected: false, range: false, current: false, disabled: true },
      { label: '24', selected: false, range: false, current: false, disabled: true },
      { label: '25', selected: false, range: false, current: false, disabled: true },
      { label: '26', selected: false, range: false, current: false, disabled: true },
      { label: '27', selected: false, range: false, current: false, disabled: true },
      { label: '28', selected: false, range: false, current: false, disabled: true },
      { label: '29', selected: false, range: false, current: false, disabled: true },
      { label: '30', selected: false, range: false, current: false, disabled: true },
      { label: '31', selected: false, range: false, current: false, disabled: true },
      { label: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с events', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      events: [new Date(1970, 0, 1), new Date(1970, 0, 2), new Date(1970, 0, 3)],
    });

    const expected: typeof result = [
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, event: true, current: false, disabled: false },
      { label: '2', selected: false, range: false, event: true, current: false, disabled: false },
      { label: '3', selected: false, range: false, event: true, current: false, disabled: false },
      { label: '4', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '5', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '6', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '7', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '8', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '9', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '10', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '11', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '12', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '13', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '14', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '15', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '16', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '17', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '18', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '19', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '20', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '21', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '22', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '23', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '24', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '25', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '26', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '27', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '28', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '29', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '30', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '31', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:Date', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: new Date(1970, 0, 3),
    });

    const expected: typeof result = [
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, current: false, disabled: false },
      { label: '2', selected: false, range: false, current: false, disabled: false },
      { label: '3', selected: true, range: false, current: false, disabled: false },
      { label: '4', selected: false, range: false, current: false, disabled: false },
      { label: '5', selected: false, range: false, current: false, disabled: false },
      { label: '6', selected: false, range: false, current: false, disabled: false },
      { label: '7', selected: false, range: false, current: false, disabled: false },
      { label: '8', selected: false, range: false, current: false, disabled: false },
      { label: '9', selected: false, range: false, current: false, disabled: false },
      { label: '10', selected: false, range: false, current: false, disabled: false },
      { label: '11', selected: false, range: false, current: false, disabled: false },
      { label: '12', selected: false, range: false, current: false, disabled: false },
      { label: '13', selected: false, range: false, current: false, disabled: false },
      { label: '14', selected: false, range: false, current: false, disabled: false },
      { label: '15', selected: false, range: false, current: false, disabled: false },
      { label: '16', selected: false, range: false, current: false, disabled: false },
      { label: '17', selected: false, range: false, current: false, disabled: false },
      { label: '18', selected: false, range: false, current: false, disabled: false },
      { label: '19', selected: false, range: false, current: false, disabled: false },
      { label: '20', selected: false, range: false, current: false, disabled: false },
      { label: '21', selected: false, range: false, current: false, disabled: false },
      { label: '22', selected: false, range: false, current: false, disabled: false },
      { label: '23', selected: false, range: false, current: false, disabled: false },
      { label: '24', selected: false, range: false, current: false, disabled: false },
      { label: '25', selected: false, range: false, current: false, disabled: false },
      { label: '26', selected: false, range: false, current: false, disabled: false },
      { label: '27', selected: false, range: false, current: false, disabled: false },
      { label: '28', selected: false, range: false, current: false, disabled: false },
      { label: '29', selected: false, range: false, current: false, disabled: false },
      { label: '30', selected: false, range: false, current: false, disabled: false },
      { label: '31', selected: false, range: false, current: false, disabled: false },
      { label: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:DateRange', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1970, 0, 3), new Date(1970, 0, 7)],
    });

    const expected: typeof result = [
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, current: false, disabled: false },
      { label: '2', selected: false, range: false, current: false, disabled: false },
      { label: '3', selected: true, range: 'first', current: false, disabled: false },
      { label: '4', selected: false, range: true, current: false, disabled: false },
      { label: '5', selected: false, range: true, current: false, disabled: false },
      { label: '6', selected: false, range: true, current: false, disabled: false },
      { label: '7', selected: true, range: 'last', current: false, disabled: false },
      { label: '8', selected: false, range: false, current: false, disabled: false },
      { label: '9', selected: false, range: false, current: false, disabled: false },
      { label: '10', selected: false, range: false, current: false, disabled: false },
      { label: '11', selected: false, range: false, current: false, disabled: false },
      { label: '12', selected: false, range: false, current: false, disabled: false },
      { label: '13', selected: false, range: false, current: false, disabled: false },
      { label: '14', selected: false, range: false, current: false, disabled: false },
      { label: '15', selected: false, range: false, current: false, disabled: false },
      { label: '16', selected: false, range: false, current: false, disabled: false },
      { label: '17', selected: false, range: false, current: false, disabled: false },
      { label: '18', selected: false, range: false, current: false, disabled: false },
      { label: '19', selected: false, range: false, current: false, disabled: false },
      { label: '20', selected: false, range: false, current: false, disabled: false },
      { label: '21', selected: false, range: false, current: false, disabled: false },
      { label: '22', selected: false, range: false, current: false, disabled: false },
      { label: '23', selected: false, range: false, current: false, disabled: false },
      { label: '24', selected: false, range: false, current: false, disabled: false },
      { label: '25', selected: false, range: false, current: false, disabled: false },
      { label: '26', selected: false, range: false, current: false, disabled: false },
      { label: '27', selected: false, range: false, current: false, disabled: false },
      { label: '28', selected: false, range: false, current: false, disabled: false },
      { label: '29', selected: false, range: false, current: false, disabled: false },
      { label: '30', selected: false, range: false, current: false, disabled: false },
      { label: '31', selected: false, range: false, current: false, disabled: false },
      { label: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с locale = en-US', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: enUSLocale,
    });

    const expected: typeof result = [
      { label: '28', disabled: true },
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, current: false, disabled: false },
      { label: '2', selected: false, range: false, current: false, disabled: false },
      { label: '3', selected: false, range: false, current: false, disabled: false },
      { label: '4', selected: false, range: false, current: false, disabled: false },
      { label: '5', selected: false, range: false, current: false, disabled: false },
      { label: '6', selected: false, range: false, current: false, disabled: false },
      { label: '7', selected: false, range: false, current: false, disabled: false },
      { label: '8', selected: false, range: false, current: false, disabled: false },
      { label: '9', selected: false, range: false, current: false, disabled: false },
      { label: '10', selected: false, range: false, current: false, disabled: false },
      { label: '11', selected: false, range: false, current: false, disabled: false },
      { label: '12', selected: false, range: false, current: false, disabled: false },
      { label: '13', selected: false, range: false, current: false, disabled: false },
      { label: '14', selected: false, range: false, current: false, disabled: false },
      { label: '15', selected: false, range: false, current: false, disabled: false },
      { label: '16', selected: false, range: false, current: false, disabled: false },
      { label: '17', selected: false, range: false, current: false, disabled: false },
      { label: '18', selected: false, range: false, current: false, disabled: false },
      { label: '19', selected: false, range: false, current: false, disabled: false },
      { label: '20', selected: false, range: false, current: false, disabled: false },
      { label: '21', selected: false, range: false, current: false, disabled: false },
      { label: '22', selected: false, range: false, current: false, disabled: false },
      { label: '23', selected: false, range: false, current: false, disabled: false },
      { label: '24', selected: false, range: false, current: false, disabled: false },
      { label: '25', selected: false, range: false, current: false, disabled: false },
      { label: '26', selected: false, range: false, current: false, disabled: false },
      { label: '27', selected: false, range: false, current: false, disabled: false },
      { label: '28', selected: false, range: false, current: false, disabled: false },
      { label: '29', selected: false, range: false, current: false, disabled: false },
      { label: '30', selected: false, range: false, current: false, disabled: false },
      { label: '31', selected: false, range: false, current: false, disabled: false },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с множеством данных', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1970, 0, 3), new Date(1970, 0, 20)],
      minDate: new Date(1970, 0, 2),
      maxDate: new Date(1970, 0, 10),
      events: [
        new Date(1970, 0, 3),
        new Date(1970, 0, 5),
        new Date(1970, 0, 7),
        new Date(1970, 0, 11),
        new Date(1970, 0, 22),
      ],
    });

    const expected: typeof result = [
      { label: '29', disabled: true },
      { label: '30', disabled: true },
      { label: '31', disabled: true },
      { label: '1', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '2', selected: false, range: false, event: false, current: false, disabled: false },
      { label: '3', selected: true, range: 'first', event: true, current: false, disabled: false },
      { label: '4', selected: false, range: true, event: false, current: false, disabled: false },
      { label: '5', selected: false, range: true, event: true, current: false, disabled: false },
      { label: '6', selected: false, range: true, event: false, current: false, disabled: false },
      { label: '7', selected: false, range: true, event: true, current: false, disabled: false },
      { label: '8', selected: false, range: true, event: false, current: false, disabled: false },
      { label: '9', selected: false, range: true, event: false, current: false, disabled: false },
      { label: '10', selected: false, range: true, event: false, current: false, disabled: false },
      { label: '11', selected: false, range: true, event: true, current: false, disabled: true },
      { label: '12', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '13', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '14', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '15', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '16', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '17', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '18', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '19', selected: false, range: true, event: false, current: false, disabled: true },
      { label: '20', selected: true, range: 'last', event: false, current: false, disabled: true },
      { label: '21', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '22', selected: false, range: false, event: true, current: false, disabled: true },
      { label: '23', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '24', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '25', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '26', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '27', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '28', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '29', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '30', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '31', selected: false, range: false, event: false, current: false, disabled: true },
      { label: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });
});
