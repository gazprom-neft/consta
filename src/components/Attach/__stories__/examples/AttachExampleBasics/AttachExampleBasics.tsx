import './AttachExampleBasics.css';

import React from 'react';

import { IconClose } from '../../../../../icons/IconClose/IconClose';
import { IconTrash } from '../../../../../icons/IconTrash/IconTrash';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cnDocsExample } from '../../../../../uiKit/components/DocsExample/DocsExample';
import { cn } from '../../../../../utils/bem';
import { Attach } from '../../../Attach';

const cnAttachExampleBasics = cn('AttachExampleBasics');

export function AttachExampleBasicsLoading() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attach
        className={cnAttachExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        loading
        loadingText="Загружено на 51%"
        buttonIcon={IconClose}
        buttonTitle="Отменить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </div>
  );
}

export function AttachExampleBasicsError() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attach
        className={cnAttachExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        errorText="Файл слишком большой, максимум 100 ТБ"
        buttonIcon={IconClose}
        buttonTitle="Отменить"
        onClick={() => console.log('onClick')}
        onButtonClick={(e) => {
          e.stopPropagation();
          console.log('onButtonClick');
        }}
      />
    </div>
  );
}

export function AttachExampleBasicsLoaded() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attach
        className={cnAttachExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        fileDescription="1,5 Mб • 21.02.2051, 14:12"
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

export function AttachExampleBasicsLink() {
  return (
    <div className={cnDocsDecorator('Section', [cnDocsExample()])}>
      <Attach
        className={cnAttachExampleBasics()}
        fileName="Инструкция по сборке марсохода"
        fileExtension="pdf"
        fileDescription="1,5 Mб • 21.02.2051, 14:12"
        onClick={() => console.log('onClick')}
      />
    </div>
  );
}
