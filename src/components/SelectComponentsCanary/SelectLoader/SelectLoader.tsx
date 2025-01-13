import './SelectLoader.css';

import React from 'react';

import { Loader } from '##/components/LoaderDeprecated';
import { cn } from '##/utils/bem';

export const cnSelectLoader = cn('SelectLoader');

export const SelectLoader = () => {
  return (
    <div className={cnSelectLoader()}>
      <Loader className={cnSelectLoader('Loader')} size="s" />
    </div>
  );
};
