import { Example } from '@consta/stand';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';

import { Combobox } from '../../../SelectCanary';

type Item = {
  label: string;
  id: number;
};

const useMockLoadData = (
  searchValue = '',
  timeout = 2000,
): [Item[], boolean, (offset: number | boolean) => void] => {
  const lastOffsetRef = useRef(-1);
  const [isLoading, setIsLoading] = useFlag();
  const [isStart, setIsStart] = useFlag();
  const [length, setLength] = useState<number>(0);
  const isLoadingOffDebounce = useDebounce(setIsLoading.off, 2000);
  const load = (offset: number | boolean) => {
    if (typeof offset === 'number' && lastOffsetRef.current !== offset) {
      lastOffsetRef.current = offset;
      setIsStart.on();
    }
    if (typeof offset === 'boolean' && offset === true) {
      setIsStart.on();
    }
  };

  const items = useMemo(() => {
    if (searchValue) {
      return new Array(10000)
        .fill(null)
        .map((_, i) => ({
          label: `Опция ${i + 1}`,
          id: i,
        }))
        .filter(
          (item) =>
            item.label
              .toLocaleLowerCase()
              .indexOf(searchValue.toLocaleLowerCase()) !== -1,
        );
    }
    return new Array(length).fill(null).map((_, i) => ({
      label: `Опция ${i + 1}`,
      id: i,
    }));
  }, [length, searchValue]);

  useEffect(() => {
    setIsLoading.on();
    isLoadingOffDebounce();
  }, [searchValue]);

  useEffect(() => {
    if (isStart) {
      setIsLoading.on();
    }

    const timeoutNumber = setTimeout(() => {
      if (isStart) {
        setLength((state) => state + 100);
        setIsLoading.off();
        setIsStart.off();
      }
    }, timeout);

    return () => {
      clearTimeout(timeoutNumber);
    };
  }, [isStart]);

  useEffect(() => {
    return () => {
      setIsLoading.off();
      setIsStart.off();
    };
  }, []);

  return [searchValue && isLoading ? [] : items, isLoading, load];
};

export const ComboboxExampleIsLoading = () => {
  const [value, setValue] = useState<Item[] | null>();
  const [data, isLoading, onDropdownOpen] = useMockLoadData();

  return (
    <Example col={1}>
      <Combobox
        placeholder="Кликните по полю ввода, чтобы данные загрузились"
        items={data}
        value={value}
        onChange={setValue}
        multiple
        onDropdownOpen={onDropdownOpen}
        isLoading={isLoading}
        virtualScroll
      />
    </Example>
  );
};

export const ComboboxExampleIsLoadingOnScrollBottom = () => {
  const [value, setValue] = useState<Item[] | null>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [data, isLoading, load] = useMockLoadData(searchValue);

  return (
    <Example col={1}>
      <Combobox
        placeholder="Кликните по полю ввода, чтобы данные загрузились"
        items={data}
        value={value}
        onChange={setValue}
        multiple
        isLoading={isLoading}
        virtualScroll
        onScrollToBottom={searchValue ? undefined : load}
        searchFunction={() => true}
        onSearchValueChange={setSearchValue}
      />
    </Example>
  );
};
