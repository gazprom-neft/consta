import './TableSelectedOptionsList.css';

import React from 'react';

import { IconClose } from '../../../icons/IconClose/IconClose';
import { cn } from '../../../utils/bem';
import { isNotNil } from '../../../utils/type-guards';
import { Button } from '../../Button/Button';
import { Tag } from '../../Tag/Tag';

const cnTableSelectedOptionsList = cn('TableSelectedOptionsList');

type Props = {
  values: Array<{ id: string; name: string; value?: any }>;
  onRemove: (id: string) => void;
  onReset: () => void;
};

type OptionValue = {
  min?: string;
  max?: string;
} & Array<{
  name: string;
  value: string | number;
}> & {
    name: string;
    value: string | number;
  };

const getTagLabel = (name: string, value?: OptionValue): string => {
  if (!isNotNil(value)) {
    return name;
  }

  let restName = '';
  if (Array.isArray(value)) {
    restName = value.map(({ name }) => name).join(', ');
  }

  if (value.min && value.max) {
    restName = `от ${value.min} до ${value.max}`;
  } else if (value.min) {
    restName = `от ${value.min}`;
  } else if (value.max) {
    restName = `до ${value.max}`;
  }

  if (value.name) {
    restName = `${value.name}`;
  }

  return name + restName;
};

export const TableSelectedOptionsList: React.FC<Props> = ({ values, onRemove, onReset }) => {
  return (
    <div className={cnTableSelectedOptionsList()}>
      <div className={cnTableSelectedOptionsList('Options')}>
        {values.map((option) => (
          <Tag
            className={cnTableSelectedOptionsList('Option')}
            key={option.id}
            label={getTagLabel(option.name, option.value)}
            size="xs"
            mode="cancel"
            onCancel={(): void => onRemove(option.id)}
          />
        ))}
      </div>
      <Button
        type="button"
        onClick={onReset}
        title="Сбросить все фильтры"
        size="xs"
        view="clear"
        onlyIcon
        iconLeft={IconClose}
        className={cnTableSelectedOptionsList('Button')}
      />
    </div>
  );
};
