import { Example } from '@consta/stand';
import React, { useState } from 'react';

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
];

export function ComboboxExampleCreate() {
  const [value, setValue] = useState<Item | null>();
  const [list, setList] = useState<Item[]>(items);
  return (
    <Example col={1}>
      <Combobox
        placeholder="Выберите вариант"
        items={list}
        value={value}
        onChange={setValue}
        onCreate={(label) =>
          setList([{ label, id: `${label}_${list.length + 1}` }, ...list])
        }
      />
    </Example>
  );
}
