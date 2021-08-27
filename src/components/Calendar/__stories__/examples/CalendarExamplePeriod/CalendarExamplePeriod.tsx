import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Calendar } from '../../../Calendar';

export const CalendarExamplePeriod = () => {
  const [rangeValue, setRangeValue] = useState<[Date?, Date?]>([]);

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar
        value={rangeValue}
        onChangeRange={({ value }) => setRangeValue(value)}
        view="slider"
      />
    </StoryBookExample>
  );
};
