import { Example } from '@consta/stand';
import React, { useState } from 'react';

import avatarUrl from '../../../__mocks__/avatar_1.jpg';
import { UserSelect } from '../../../UserSelectDeprecated';

type Item = {
  label: string;
  subLabel?: string;
  avatarUrl?: string;
  id: string | number;
};

const items: Item[] = [
  {
    label: 'Андрей Андреев',
    subLabel: 'andrey@gmail.com',
    id: 1,
  },
  {
    label: 'Иван Иванов',
    subLabel: 'ivan@gmail.com',
    id: 2,
  },
  {
    label: 'Егор Егоров',
    subLabel: 'igor@icloud.com',
    avatarUrl,
    id: 3,
  },
];

export function UserSelectExampleView() {
  const [value, setValue] = useState<Item | null>();
  return (
    <Example col={1}>
      <UserSelect
        placeholder="Выберите пользователя"
        view="clear"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
}
