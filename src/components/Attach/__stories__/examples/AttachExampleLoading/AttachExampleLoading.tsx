import './AttachExampleLoading.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleLoading = cn('AttachExampleLoading');

export function AttachExampleLoading() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attach
        className={cnAttachExampleLoading()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="docx"
        fileDescription="25,5 Mб 19.07.2020, 21:12"
        loadingText="Я ещё не загрузился, уже загружено"
        loading
        loadingProgress={70}
      />
    </div>
  );
}
