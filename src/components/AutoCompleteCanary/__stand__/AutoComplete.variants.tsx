import './AutoComplete.variants.css';

import { IconPhoto } from '@consta/icons/IconPhoto';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useMemo, useState } from 'react';

import {
  fieldPropForm,
  fieldPropFormDefault,
  fieldPropSize,
  fieldPropSizeDefault,
  fieldPropStatus,
  fieldPropView,
  fieldPropViewDefault,
} from '##/components/FieldComponents/__mocks__/variants';
import { cn } from '##/utils/bem';

import {
  getMailItems,
  groups,
  items as itemsArr,
} from '../__mocks__/data.mock';
import { AutoComplete } from '../AutoComplete';

const cnAutoCompleteVariants = cn('AutoCompleteVariants');

const Variants = () => {
  const type = useSelect('type', ['text', 'email', 'textarray'], 'text');
  const form = useSelect('form', fieldPropForm, fieldPropFormDefault);
  const dropdownForm = useSelect(
    'dropdownForm',
    ['default', 'brick', 'round'],
    undefined,
  );
  const status = useSelect('status', fieldPropStatus);
  const size = useSelect('size', fieldPropSize, fieldPropSizeDefault);
  const view = useSelect('view', fieldPropView, fieldPropViewDefault);
  const disabled = useBoolean('disabled', false);
  const withClearButton = useBoolean('withClearButton', false);
  const maxLength = useNumber('maxLength', 200);
  const placeholder = useText('placeholder', 'Подсказка в поле');
  const leftSideType = useSelect('leftSideType', ['icon', 'text']);
  const leftSideText = useText('leftSideText', 'from');
  const rightSideType = useSelect('rightSideType', ['icon', 'text']);
  const rightSideText = useText('rightSideText', 'm²');
  const withGroups = useBoolean('withGroups', false);

  const [value, setValue] = useState<string[] | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);

  const leftSideSelect = {
    text: leftSideText,
    icon: IconPhoto,
  };

  const rightSideSelect = {
    text: rightSideText,
    icon: IconPhoto,
  };
  const leftSide = leftSideType && leftSideSelect[leftSideType];
  const rightSide = rightSideType && rightSideSelect[rightSideType];

  const items = useMemo(() => {
    if (type === 'email') {
      return getMailItems(inputValue);
    }
    return itemsArr;
  }, [inputValue, type]);

  const props = {
    form,
    status,
    size,
    view,
    items,
    dropdownForm,
    groups: withGroups ? groups : [],
    withClearButton,
    maxLength,
    placeholder,
    leftSide,
    rightSide,
    disabled,
  };

  if (type === 'textarray') {
    return (
      <div className={cnAutoCompleteVariants()}>
        <AutoComplete
          {...props}
          value={value}
          type="textarray"
          inputValue={inputValue}
          onInputChange={setInputValue}
          onChange={setValue}
        />
      </div>
    );
  }
  return (
    <div className={cnAutoCompleteVariants()}>
      <AutoComplete
        {...props}
        value={inputValue}
        onChange={setInputValue}
        type={type}
      />
    </div>
  );
};

export default Variants;
