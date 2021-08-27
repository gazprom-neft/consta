import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Badge } from '../../../Badge';

export const BadgeExampleView = () => (
  <div
    className={cnDocsDecorator('Section', [cnDocsExample(), wp.decorator({ 'indent-t': 'xl' })])}
  >
    <Badge view="filled" label="Filled badge" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge view="stroked" label="Stroked badge" className={wp.decorator({ 'indent-r': 'm' })} />
  </div>
);
