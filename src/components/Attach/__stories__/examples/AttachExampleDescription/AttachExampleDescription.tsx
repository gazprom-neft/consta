import './AttachExampleDescription.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleDescription = cn('AttachExampleDescription');

export function AttachExampleDescription() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <div>
        <Attach
          className={cnAttachExampleDescription()}
          fileName="Фотография"
          fileExtension="jpg"
          fileDescription="1,5 Mб 19.07.2020, 16:11"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleDescription()}
          fileName="Скан паспорта"
          fileExtension="pdf"
          fileDescription="1,5 Mб 19.07.2020, 16:12"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleDescription()}
          fileName="Сопроводительное письмо"
          fileExtension="docx"
          fileDescription="225 Mб 19.07.2020, 17:15"
        />
      </div>
    </div>
  );
}
