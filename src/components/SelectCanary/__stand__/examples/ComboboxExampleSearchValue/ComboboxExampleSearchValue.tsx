import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Button } from '##/components/Button';
import { cnMixSpace } from '##/mixs/MixSpace';

import { Combobox } from '../../../SelectCanary';

type Item = {
  label: string;
  id: number | string;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
  {
    label: 'Четвертый',
    id: 4,
  },
  {
    label: 'Пятый',
    id: 5,
  },
];

export function ComboboxExampleSearchValue() {
  const [value, setValue] = useState<Item[] | null>();
  const [searchValue, setSearchValue] = useState<string | undefined>();

  return (
    <Example col={1}>
      <>
        <Combobox
          className={cnMixSpace({ mB: 'm' })}
          placeholder="Выберите вариант"
          items={items}
          value={value}
          onChange={setValue}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          multiple
        />
        <Button
          className={cnMixSpace({ mR: 'm' })}
          label="Второй"
          onClick={() => setSearchValue('Второй')}
        />
        <Button
          className={cnMixSpace({ mR: 'm' })}
          label="Первый"
          onClick={() => setSearchValue('Первый')}
        />
        <Button label="Очистить" onClick={() => setSearchValue(undefined)} />
      </>
    </Example>
  );
}
