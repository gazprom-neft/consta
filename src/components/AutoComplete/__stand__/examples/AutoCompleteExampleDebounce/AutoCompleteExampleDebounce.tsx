import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { AutoComplete } from '##/components/AutoComplete';
import { groups } from '##/components/AutoComplete/__mocks__/data.mock';

export const AutoCompleteExampleDebounce = () => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Example>
      <AutoComplete
        value={value}
        items={groups}
        getItemKey={(item) => item.label}
        getItemLabel={(item) => item.label}
        onChange={setValue}
        type="text"
        searchDebounceDelay={1000}
      />
    </Example>
  );
};
