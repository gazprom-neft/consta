import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Combobox } from '../../../SelectCanary';

type Item = {
  label: string;
  id: number;
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

export function ComboboxExampleForm() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="Форма round"
        form="round"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Combobox
        placeholder="Форма defaultBrick"
        form="defaultBrick"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
}
