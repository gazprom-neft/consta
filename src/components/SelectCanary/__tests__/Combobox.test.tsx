import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import * as React from 'react';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';
import { cnSelect } from '##/components/SelectComponents/cnSelect';
import { cnSelectValueTag } from '##/components/SelectComponents/SelectValueTag/SelectValueTag';
import { cn } from '##/utils/bem';

import { Combobox, ComboboxProps, defaultGetItemLabel } from '..';
import { groups, items } from '../__mocks__/data.mock';
import { ComboboxGroupDefault, ComboboxItemDefault } from '../helpers';

const animationDuration = 200;
const testId = 'Combobox';
const cnRenderValue = cn('RenderValue');
const cnRenderItem = cn('RenderItem');

const defaultProps: ComboboxProps = {
  items,
  value: null,
  onChange: jest.fn(),
  ariaLabel: 'test-combobox',
};

function renderComponent<
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
>(props: ComboboxProps<ITEM, GROUP, MULTIPLE>): RenderResult {
  return render(
    <>
      <div data-testid="outside" />
      <Combobox<ITEM, GROUP, MULTIPLE> data-testid={testId} {...props} />
    </>,
  );
}

function getRender() {
  return screen.getByTestId(testId);
}
function getOutside() {
  return screen.getByTestId('outside');
}
function getItemsList() {
  return screen.getByRole('listbox');
}
function getControlValue() {
  return getRender().querySelector(
    `.${cnSelect('ControlValue')}`,
  ) as HTMLDivElement;
}
function getSelectValues() {
  return getRender().querySelectorAll(`.${cnSelectValueTag()}`);
}
function getSelectValue(index = 0) {
  return getSelectValues()[index];
}
function getRenderValue() {
  return getRender().querySelector(`.${cnRenderValue()}`) as HTMLDivElement;
}
function getIndicatorsDropdown() {
  return getRender().querySelector(
    `.${cnSelect('IndicatorsDropdown')}`,
  ) as HTMLElement;
}
function indicatorsDropdownClick() {
  fireEvent.click(getIndicatorsDropdown());
}
function getInput() {
  return getRender().querySelector(`.${cnSelect('Input')}`) as HTMLElement;
}
function getItems() {
  return getItemsList().querySelectorAll(`.${cnListItem()}`);
}
function getRenderItems() {
  return getItemsList().querySelectorAll(`.${cnRenderItem()}`);
}
function getGroups() {
  return getItemsList().querySelectorAll(`.${cnListGroupLabel()}`);
}
function getItem(index = 0) {
  return getItems()[index];
}
function inputClick() {
  fireEvent.click(getInput());
}
function outsideClick() {
  fireEvent.mouseDown(getOutside());
}
function animateDelay() {
  act(() => {
    jest.advanceTimersByTime(animationDuration);
  });
}

describe('Компонент Combobox', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent(defaultProps)).not.toThrow();
  });

  it(`Присваивается дополнительный className`, () => {
    const className = 'className';

    renderComponent({ ...defaultProps, className });
    expect(getRender()).toHaveClass(className);
  });

  it('рендериться с установленным значением при multiple = false', () => {
    jest.useFakeTimers();
    const index = 0;
    const value = items[index];
    act(() => {
      renderComponent({
        ...defaultProps,
        value,
      });
    });

    expect(getControlValue().textContent).toEqual(defaultGetItemLabel(value));

    inputClick();
    animateDelay();

    expect(getItem(index)).toHaveClass(cnListItem({ checked: true }));
  });

  it('рендериться с установленным значением при multiple = true', () => {
    jest.useFakeTimers();
    const indexes = [0, 1, 5];
    const value = indexes.map((index) => items[index]);

    act(() => {
      renderComponent({
        ...defaultProps,
        multiple: true,
        value,
      });
    });

    expect(getSelectValues().length).toEqual(value.length);
    expect(getSelectValue(0).textContent).toEqual(
      defaultGetItemLabel(value[0]),
    );
    expect(getSelectValue(1).textContent).toEqual(
      defaultGetItemLabel(value[1]),
    );
    expect(getSelectValue(2).textContent).toEqual(
      defaultGetItemLabel(value[2]),
    );

    inputClick();
    animateDelay();

    expect(getItem(indexes[0])).toHaveAttribute('aria-selected', 'true');
    expect(getItem(indexes[1])).toHaveAttribute('aria-selected', 'true');
    expect(getItem(indexes[2])).toHaveAttribute('aria-selected', 'true');
  });

  it('открывается и закрывается по клику', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent(defaultProps);
    });

    inputClick();

    animateDelay();

    const optionsList = getItemsList();

    expect(optionsList).toBeInTheDocument();
    inputClick();
    animateDelay();

    expect(optionsList).not.toBeInTheDocument();
  });

  it('открывается и закрывается по клику за пределами селекта', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent(defaultProps);
    });

    inputClick();
    animateDelay();

    const optionsList = getItemsList();

    expect(optionsList).toBeInTheDocument();
    outsideClick();
    animateDelay();
    expect(optionsList).not.toBeInTheDocument();
  });

  it('открывается и закрывается по клику на индикатор', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent(defaultProps);
    });

    indicatorsDropdownClick();
    animateDelay();

    const optionsList = getItemsList();

    expect(optionsList).toBeInTheDocument();
    indicatorsDropdownClick();
    animateDelay();
    expect(optionsList).not.toBeInTheDocument();
  });

  it('отрисовываются опции', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent(defaultProps);
    });

    inputClick();
    animateDelay();
    expect(getItems().length).toEqual(items.length);
  });

  it('отрисовываются группы', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ ...defaultProps, groups });
    });

    inputClick();
    animateDelay();
    expect(getGroups().length).toEqual(groups.length);
  });

  it('проверка onChange при multiple = false', () => {
    jest.useFakeTimers();
    const handleChange = jest.fn();
    const elementIndex = 1;
    act(() => {
      renderComponent({ ...defaultProps, onChange: handleChange });
    });

    inputClick();
    animateDelay();

    fireEvent.click(getItem(elementIndex));

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(items[elementIndex], {
      e: expect.any(Object),
    });
  });

  it('проверка onChange при multiple = true', () => {
    jest.useFakeTimers();
    const handleChange = jest.fn();
    const elementIndex = 1;
    act(() => {
      renderComponent({
        ...defaultProps,
        multiple: true,
        onChange: handleChange,
      });
    });

    inputClick();
    animateDelay();

    fireEvent.click(getItem(elementIndex));

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith([items[elementIndex]], {
      e: expect.any(Object),
    });
  });

  it('вызывается onFocus', () => {
    const handlerFocus = jest.fn();
    renderComponent({ ...defaultProps, onFocus: handlerFocus });

    expect(handlerFocus).toBeCalledTimes(0);

    getInput().focus();

    expect(handlerFocus).toBeCalledTimes(1);
  });

  it('вызывается onBlur', () => {
    const handlerBlur = jest.fn();
    renderComponent({ ...defaultProps, onBlur: handlerBlur });

    getInput().focus();

    expect(handlerBlur).toBeCalledTimes(0);

    getInput().blur();

    expect(handlerBlur).toBeCalledTimes(1);
  });

  it('renderValue отрабатывает верно', () => {
    const value = items[0];
    renderComponent({
      ...defaultProps,
      value,
      renderValue: ({ item }) => (
        <div className={cnRenderValue()}>{defaultGetItemLabel(item)}</div>
      ),
    });

    expect(getRenderValue().textContent).toEqual(defaultGetItemLabel(value));
  });

  it('renderItem отрабатывает верно', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({
        ...defaultProps,
        renderItem: ({ item }) => (
          <div
            className={cnRenderItem()}
            role="option"
            tabIndex={0}
            aria-selected={false}
            aria-hidden="true"
          >
            {defaultGetItemLabel(item)}
          </div>
        ),
      });
    });

    inputClick();
    animateDelay();

    expect(getRenderItems().length).toEqual(items.length);
  });
});
