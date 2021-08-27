import './AttachExampleEvents.css';

import React from 'react';

import { IconTrash } from '../../../../../icons/IconTrash/IconTrash';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleEvents = cn('AttachExampleEvents');

export function AttachExampleEvents() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attach
        className={cnAttachExampleEvents()}
        fileName="my_tale_about_mars_final_last_12"
        fileExtension="docx"
        fileDescription="1,5 Mб 21.02.2020, 14:12"
        loadingText="Загрузка"
        buttonIcon={IconTrash}
        buttonTitle="Удалить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </div>
  );
}
