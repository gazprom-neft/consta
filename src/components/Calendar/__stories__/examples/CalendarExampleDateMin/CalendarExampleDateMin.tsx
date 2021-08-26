import React from 'react';
import { startOfWeek } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Calendar } from '../../../Calendar';

export const CalendarExampleDateMin = () => {
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Calendar minDate={startOfWeek(new Date(), { locale: ruLocale })} maxDate={new Date()} />
    </StoryBookExample>
  );
};
