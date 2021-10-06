import './ProgressStepBarExampleContent.css';

import React, { useState } from 'react';

import { IconDinosaur } from '../../../../../icons/IconDinosaur/IconDinosaur';
import { IconSettings } from '../../../../../icons/IconSettings/IconSettings';
import { cn } from '../../../../../utils/bem';
import { Tag } from '../../../../Tag/Tag';
import { ProgressStepBar } from '../../../ProgressStepBar';

const cnProgressStepBarExampleContent = cn('ProgressStepBarExmapleContent');

const StepContent = () => {
  return (
    <div className={cnProgressStepBarExampleContent('Content')}>
      <IconDinosaur size="xs" view="secondary" />
      <Tag mode="button" onClick={() => console.log()} label="Черновик" />
      <Tag mode="button" onClick={() => console.log()} label="" icon={IconSettings} />
    </div>
  );
};

export const ProgressStepBarExampleContent = () => {
  const [status, setStatus] = useState<string>('normal');

  const clickAction = () => {
    setStatus(status === 'normal' ? 'success' : 'normal');
  };

  const steps = [
    {
      label: 'Пункт 1',
      id: 1,
      point: 1,
      status,
      lineStatus: 'normal',
      content: <StepContent />,
      onClick: () => clickAction(),
    },
    {
      label: 'Пункт 2',
      point: 2,
      id: 2,
      status,
      lineStatus: 'normal',
      onClick: () => clickAction(),
    },
    {
      label: 'Пункт 3',
      point: 3,
      id: 3,
      status,
      lineStatus: 'normal',
      onClick: () => clickAction(),
    },
    {
      label: 'Пункт 4',
      point: 4,
      id: 4,
      status,
      content: <StepContent />,
      onClick: () => clickAction(),
    },
  ];

  return <ProgressStepBar steps={steps} activeStepId={2} size="m" />;
};
