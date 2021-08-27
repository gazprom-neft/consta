import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Badge } from '../../../Badge';

export const BadgeExampleSize = () => (
  <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
    <Badge size="s" label="Badge s" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge size="m" label="Badge m" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge size="l" label="Badge l" className={wp.decorator({ 'indent-r': 'm' })} />
  </div>
);
