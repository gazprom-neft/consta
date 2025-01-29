import './Combobox.variants.css';

import { IconQuestion } from '@consta/icons/IconQuestion';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import {
  defaultPropForm,
  defaultPropSize,
  defaultPropView,
  propForm,
  propStatus,
  propView,
} from '../../SelectComponentsDeprecated/types';
import { Combobox } from '..';
import { groups, Item, items } from '../__mocks__/data.mock';

const getUndefined = () => undefined;

const conditionalGetter = (conditional: boolean) =>
  conditional ? undefined : getUndefined;

const cnComboboxVariants = cn('ComboboxVariants');

const Variants = () => {
  const disabled = useBoolean('disabled', false);
  const itemsDisabled = useBoolean('itemsDisabled', false);
  const size = useSelect('size', ['m', 's', 'l', 'xs'], defaultPropSize);
  const view = useSelect('view', propView, defaultPropView);
  const form = useSelect('form', propForm, defaultPropForm);
  const dropdownForm = useSelect(
    'dropdownForm',
    ['default', 'brick', 'round'],
    undefined,
  );
  const required = useBoolean('required', false);
  const caption = useText('caption', 'Хорошо подумайте, это важно');
  const label = useText('label', 'Здесь можно выбрать цвет');
  const status = useSelect('status', propStatus);
  const labelPosition = useSelect('labelPosition', ['top', 'left'], 'top');
  const placeholder = useText('placeholder', 'Placeholder');
  const withGroups = useBoolean('withGroups', false);
  const isLoading = useBoolean('isLoading', false);
  const multiple = useBoolean('multiple', false);
  const selectAll = useBoolean('selectAll', false, multiple);
  const allSelectedAllLabel = useText('allSelectedAllLabel', 'Все', multiple);
  const withLabelIcon = useBoolean('withLabelIcon', false);

  const [value, setValue] = useState<Item | null>(null);
  const [valueMultiple, setValueMultiple] = useState<Item[] | null>([items[0]]);

  if (multiple) {
    return (
      <div className={cnComboboxVariants()}>
        <Combobox
          key="multiple"
          size={size}
          disabled={disabled}
          view={view}
          selectAll={selectAll}
          form={form}
          required={required}
          status={status}
          allSelectedAllLabel={allSelectedAllLabel}
          dropdownForm={dropdownForm}
          placeholder={placeholder}
          items={items}
          labelIcon={withLabelIcon ? IconQuestion : undefined}
          value={valueMultiple}
          onChange={setValueMultiple}
          groups={withGroups ? groups : []}
          multiple
          isLoading={isLoading}
          label={label}
          labelPosition={labelPosition}
          caption={caption}
          getItemDisabled={conditionalGetter(itemsDisabled)}
        />
      </div>
    );
  }
  return (
    <div className={cnComboboxVariants()}>
      <Combobox
        key="not-multiple"
        size={size}
        disabled={disabled}
        view={view}
        labelIcon={withLabelIcon ? IconQuestion : undefined}
        form={form}
        isLoading={isLoading}
        required={required}
        dropdownForm={dropdownForm}
        status={status || undefined}
        placeholder={placeholder}
        items={items}
        value={value}
        onChange={setValue}
        groups={withGroups ? groups : []}
        label={label}
        labelPosition={labelPosition}
        caption={caption}
        getItemDisabled={conditionalGetter(itemsDisabled)}
      />
    </div>
  );
};

export default Variants;
