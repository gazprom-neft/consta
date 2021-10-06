import React from 'react';

import { ProgressStepBar } from '../../../ProgressStepBar';

type Item = {
  label: string;
  id: number | string;
  point?: number;
  progress?: boolean;
  status?: 'normal' | 'success' | 'alert' | 'warning';
  lineStatus?: 'normal' | 'success' | 'alert' | 'warning';
};

const steps: Item[] = [
  {
    label: 'Пункт 1',
    id: 1,
    point: 1,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Пункт 2',
    point: 2,
    id: 2,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Пункт 3',
    point: 3,
    id: 3,
    progress: true,
    status: 'normal',
    lineStatus: 'normal',
  },
  {
    label: 'Пункт 4',
    point: 4,
    id: 4,
    status: 'normal',
  },
];

export const ProgressStepBarExampleProgress = () => {
  return <ProgressStepBar steps={steps} activeStepId={3} />;
};
