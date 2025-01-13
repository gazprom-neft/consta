import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Combobox } from '../../../SelectCanary';

type Item = {
  label: string;
  id: number;
  groupId: number;
};

type Group = {
  label: string;
  id: number;
};

const groups: Group[] = [
  {
    id: 1,
    label: 'Первая группа',
  },
  {
    id: 2,
    label: 'Вторая группа',
  },
  {
    id: 3,
    label: 'Третья группа',
  },
];

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
    groupId: 1,
  },
  {
    label: 'Второй',
    id: 2,
    groupId: 2,
  },
  {
    label: 'Третий',
    id: 3,
    groupId: 1,
  },
  {
    label: 'Четвертый',
    id: 4,
    groupId: 3,
  },
  {
    label: 'Пятый',
    id: 5,
    groupId: 2,
  },
];

export function ComboboxExampleGroups() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onChange={setValue}
        groups={groups}
      />
    </Example>
  );
}
