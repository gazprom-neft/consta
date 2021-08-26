import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Calendar } from '../../../Calendar';

export const CalendarExamplePeriod = () => {
  const [rangeValue, setRangeValue] = useState<[Date?, Date?]>([]);

  const handleChange = ({ value }: { value: Date }) => {
    const [startDate, endDate] = rangeValue;

    if (!startDate && !endDate) {
      setRangeValue([value, undefined]);
      return;
    }

    if (startDate && startDate.getTime() === value.getTime()) {
      setRangeValue([endDate, undefined]);
      return;
    }

    if (endDate && endDate.getTime() === value.getTime()) {
      setRangeValue([startDate, undefined]);
      return;
    }

    if (startDate) {
      setRangeValue(startDate > value ? [value, startDate] : [startDate, value]);
      return;
    }

    if (endDate) {
      setRangeValue(endDate > value ? [value, endDate] : [endDate, value]);
    }
  };

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar value={rangeValue} onChange={handleChange} />
    </StoryBookExample>
  );
};
