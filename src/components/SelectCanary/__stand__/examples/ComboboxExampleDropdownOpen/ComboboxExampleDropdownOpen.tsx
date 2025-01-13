import { AnimateIconSwitcherProvider } from '@consta/icons/AnimateIconSwitcherProvider';
import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { withAnimateSwitcherHOC } from '@consta/icons/withAnimateSwitcherHOC';
import { Example } from '@consta/stand';
import React, { useCallback, useRef, useState } from 'react';

import { Button } from '##/components/Button';
import { FieldGroup } from '##/components/FieldGroup';
import { useFlag } from '##/hooks/useFlag';

import { Combobox } from '../../../SelectCanary';

type Item = {
  label: string;
  id: number | string;
};

const items: Item[] = [
  {
    label: 'Первый',
    id: 1,
  },
  {
    label: 'Второй',
    id: 2,
  },
  {
    label: 'Третий',
    id: 3,
  },
];

const Icon = withAnimateSwitcherHOC({
  startIcon: IconArrowDown,
  startDirection: 0,
  endDirection: 180,
});

export const ComboboxExampleDropdownOpen = () => {
  const [value, setValue] = useState<Item | null>();
  const [open, setOpen] = useFlag();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const onDropdownOpen = useCallback((open: boolean) => {
    setOpen.set(open);
    if (open) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <Example col={1}>
      <AnimateIconSwitcherProvider active={open}>
        <FieldGroup>
          <Button
            ref={buttonRef}
            label={open ? 'Закрыть' : 'Открыть'}
            onClick={setOpen.toggle}
            iconLeft={Icon}
            onlyIcon
          />
          <Combobox
            inputRef={inputRef}
            placeholder="Выберите вариант"
            items={items}
            value={value}
            onChange={setValue}
            dropdownOpen={open}
            onDropdownOpen={onDropdownOpen}
            ignoreOutsideClicksRefs={[buttonRef]}
          />
        </FieldGroup>
      </AnimateIconSwitcherProvider>
    </Example>
  );
};
