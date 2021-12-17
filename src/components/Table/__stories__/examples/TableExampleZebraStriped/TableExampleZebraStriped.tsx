import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Table } from '../../../Table';

const columns = [
  {
    title: '№',
    accessor: 'id',
    width: 100,
    sortable: true,
  },
  {
    title: 'Имя',
    accessor: 'name',
    sortable: true,
  },
];

const rows = [
  { id: '1', name: 'Антон' },
  { id: '2', name: 'Василий' },
];

export function TableExampleZebraOdd() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} zebraStriped="odd" />
    </StoryBookExample>
  );
}

export function TableExampleZebraEven() {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Table columns={columns} rows={rows} zebraStriped="even" />
    </StoryBookExample>
  );
}
