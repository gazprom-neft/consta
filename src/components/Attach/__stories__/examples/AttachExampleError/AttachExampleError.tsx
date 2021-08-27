import './AttachExampleError.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleError = cn('AttachExampleError');

export function AttachExampleError() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <div>
        <Attach
          className={cnAttachExampleError()}
          fileName="Марсианский закат"
          fileExtension="jpg"
          errorText="Фотография не загрузилась"
        />
      </div>
      <div>
        <Attach
          className={cnAttachExampleError()}
          fileName="Марсианский закат"
          fileExtension="jpg"
          errorText="Файл слишком большой, максимум 100 ТБ"
        />
      </div>
    </div>
  );
}
