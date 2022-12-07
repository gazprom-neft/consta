import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { IconAdd } from '##/icons/IconAdd/IconAdd';
import { IconRemove } from '##/icons/IconRemove/IconRemove';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconCustomIconDirection = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
      <Collapse
        label="Здесь у иконки меняется направление"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        icon={IconAdd}
        directionIcon="up"
        closeDirectionIcon="downRight"
      >
        {content}
      </Collapse>
    </Example>
  );
};

export const CollapseExampleIconCustomIcon = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
      <Collapse
        label="Здесь меняется иконка"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        icon={IconAdd}
        closeIcon={IconRemove}
      >
        {content}
      </Collapse>
    </Example>
  );
};
