import { render } from '@testing-library/react';
import React from 'react';

import { cnLoader } from '../../LoaderDeprecated/LoaderDeprecated';
import { cnSelectCreateButton } from '../SelectCreateButton/SelectCreateButton';
import {
  SelectDropdown,
  selectDropdownForm,
} from '../SelectDropdown/SelectDropdown';

type Props = React.ComponentProps<typeof SelectDropdown>;

const defaultProps: Props = {
  size: 's',
  controlRef: { current: null },
  dropdownRef: { current: null },
  form: 'default',
  isOpen: true,
  renderItem: () => <div>Element</div>,
  visibleItems: [],
  getOptionProps: jest.fn(),
  itemsRefs: [],
};

const renderComponent = (props: Partial<Props>) => {
  return render(<SelectDropdown {...defaultProps} {...props} />);
};

const getSelectCreateButton = (base: Element) => {
  return base.querySelector(`.${cnSelectCreateButton()}`) as Element;
};

const getIsLoader = (base: Element) => {
  return base.querySelector(`.${cnLoader()}`) as Element;
};

describe('Компонент SelectDropdown', () => {
  describe('должен рендериться без ошибок', () => {
    selectDropdownForm.forEach((form) => {
      it(`для form = ${form}`, () => {
        expect(() => renderComponent({ form })).not.toThrow();
      });
    });
  });

  describe('проверка props', () => {
    it('проверка isLoading', () => {
      const { baseElement } = renderComponent({ isLoading: true });

      expect(getIsLoader(baseElement)).toBeInTheDocument();
    });
  });

  it('отображает OptionForCreate', () => {
    const label = 'Option for create';
    const visibleItems = [
      {
        label,
        __optionForCreate: true,
      },
    ];
    const { baseElement } = renderComponent({ visibleItems });

    expect(getSelectCreateButton(baseElement)).toBeInTheDocument();
    expect(baseElement).toHaveTextContent(label);
  });
});
