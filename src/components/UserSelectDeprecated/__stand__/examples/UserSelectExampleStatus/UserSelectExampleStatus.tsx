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

export const UserSelectExampleStatus = () => {
  const [value, setValue] = useState<Item | null>();

  return (
    <Example col={1}>
      <UserSelect
        placeholder="default"
        caption="default"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <UserSelect
        placeholder="alert"
        caption="alert"
        status="alert"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <UserSelect
        placeholder="warning"
        caption="warning"
        status="warning"
        size="s"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
      <UserSelect
        placeholder="success"
        caption="success"
        size="s"
        status="success"
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
      />
    </Example>
  );
};
