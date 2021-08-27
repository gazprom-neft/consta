import './AttachExampleIcon.css';

import React from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleIcon = cn('AttachExampleIcon');

export function AttachExampleIcon() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <div>
        <Attach className={cnAttachExampleIcon()} fileName="Картинка в JPG" fileExtension="jpg" />
      </div>
      <div>
        <Attach
          className={cnAttachExampleIcon()}
          fileName="Картинка в непонятном формате BZZ"
          fileExtension="bzz"
        />
      </div>
    </div>
  );
}
