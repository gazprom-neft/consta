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

export function ComboboxExampleStatus() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="default"
        caption="default"
        size="s"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Combobox
        placeholder="alert"
        caption="alert"
        status="alert"
        size="s"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Combobox
        placeholder="warning"
        caption="warning"
        status="warning"
        size="s"
        items={items}
        value={value}
        onChange={setValue}
      />
      <Combobox
        placeholder="success"
        caption="success"
        size="s"
        status="success"
        items={items}
        value={value}
        onChange={setValue}
      />
    </Example>
  );
}
