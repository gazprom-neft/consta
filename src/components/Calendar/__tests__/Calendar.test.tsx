import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Calendar, cnCalendar, cnCalendarItem } from '../Calendar';

type CalendarProps = React.ComponentProps<typeof Calendar>;

const testId = cnCalendar();

const getRender = () => screen.getByTestId(testId);
const getCalendarItems = () => getRender().querySelectorAll(`.${cnCalendarItem()}`);
const getCalendarItem = (item = 0) => getCalendarItems()[item];

const renderComponent = (props: CalendarProps = {}) => {
  return render(<Calendar {...props} data-testid={testId} />);
};

describe('Компонент Calendar', () => {
  it('должен рендериться без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  describe('проверка className', () => {
    it(`Дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });

  describe('проверка onChange', () => {
    it('onChange отрабатывает при клике по дню месяца', () => {
      const handleClick = jest.fn();
      renderComponent({ onChange: handleClick, currentVisibleDate: new Date(1970, 0) });
      // 1 Января
      const CalendarItem = getCalendarItem(3);

      fireEvent.click(CalendarItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('onChange не отрабатывает при клике дню вне месяца', () => {
      const handleClick = jest.fn();
      renderComponent({ onChange: handleClick, currentVisibleDate: new Date(1970, 0) });

      const CalendarItem = getCalendarItem(0);

      fireEvent.click(CalendarItem);

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
    it('onChange отрабатывает в допустимом интервале дат', () => {
      const handleClick = jest.fn();

      renderComponent({
        onChange: handleClick,
        currentVisibleDate: new Date(1970, 0),
        minDate: new Date(1970, 0, 2),
        maxDate: new Date(1970, 0, 3),
      });

      const CalendarItem = getCalendarItem(5);

      fireEvent.click(CalendarItem);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
    it('onChange не отрабатывает вне допустимого интервала дат', () => {
      const handleClick = jest.fn();

      renderComponent({
        onChange: handleClick,
        currentVisibleDate: new Date(1970, 0),
        minDate: new Date(1970, 0, 2),
        maxDate: new Date(1970, 0, 3),
      });

      const CalendarItem = getCalendarItem(0);

      fireEvent.click(CalendarItem);

      expect(handleClick).toHaveBeenCalledTimes(0);
    });
  });
});
