import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Badge } from '../../../Badge';

export const BadgeExampleSize = () => (
  <StoryBookExample className={cnDocsDecorator('Section')}>
    <Badge size="s" label="Badge s" />
    <Badge size="m" label="Badge m" />
    <Badge size="l" label="Badge l" />
  </StoryBookExample>
);
