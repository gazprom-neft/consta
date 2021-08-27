import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { Badge } from '../../../Badge';

export const BadgeExampleAs = () => (
  <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
    <Badge as="a" href="#" label="Я ссылка, которая притворяется бейджиком" />
  </div>
);
