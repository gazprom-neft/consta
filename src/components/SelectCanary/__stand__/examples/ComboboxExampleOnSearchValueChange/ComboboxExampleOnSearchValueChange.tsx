import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Combobox } from '##/components/Combobox';
import { Text } from '##/components/Text';

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

export function ComboboxExampleOnSearchValueChange() {
  const [value, setValue] = useState<Item | null>();
  const [search, setSearch] = useState<string>('');
  return (
    <Example col={1}>
      <Text view="primary" size="l" lineHeight="m">
        Значение поиска: {search ?? 'Пусто'}
      </Text>
      <Combobox
        placeholder="Выберите вариант"
        items={items}
        value={value}
        onSearchValueChange={setSearch}
        onChange={setValue}
      />
    </Example>
  );
}
