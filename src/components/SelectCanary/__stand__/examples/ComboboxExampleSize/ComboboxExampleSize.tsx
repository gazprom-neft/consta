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

export function ComboboxExampleSize() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="Размер s"
        size="s"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Combobox
        placeholder="Размер m"
        size="m"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Combobox
        placeholder="Размер l"
        size="l"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
}
