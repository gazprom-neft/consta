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

const items: Item[] = new Array(100000).fill(null).map((_, i) => ({
  label: `Опция ${i + 1}`,
  groupId: Math.floor(i / 100) + 1,
  id: i,
}));

const groups: Group[] = new Array(items.length / 100)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    label: `Группа ${i + 1}`,
  }));

export const ComboboxExampleVirtualScroll = () => {
  const [value, setValue] = useState<Item[] | null>();
  return (
    <Example col={1}>
      <Combobox
        placeholder="Чтобы посмотреть весь список, прокрутите вниз"
        items={items}
        value={value}
        onChange={setValue}
        groups={groups}
        multiple
        selectAll
        virtualScroll
      />
    </Example>
  );
};
