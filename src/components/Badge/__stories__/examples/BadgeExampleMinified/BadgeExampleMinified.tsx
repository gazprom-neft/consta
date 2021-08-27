import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import * as wp from '../../../../../uiKit/whitepaper/whitepaper';
import { Badge } from '../../../Badge';

export const BadgeExampleMinified = () => (
  <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
    <Badge minified status="error" label="Стойте" className={wp.decorator({ 'indent-r': 'm' })} />
    <Badge minified status="success" label="Идите" className={wp.decorator({ 'indent-r': 'm' })} />
  </div>
);
