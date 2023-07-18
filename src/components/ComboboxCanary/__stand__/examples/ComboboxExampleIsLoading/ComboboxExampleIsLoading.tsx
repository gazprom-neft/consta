import { Example } from '@consta/stand';
import React, { useEffect, useMemo, useState } from 'react';

import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';

import { Combobox } from '../../../Combobox';

type Item = {
  label: string;
  id: number;
};

const useMockLoadData = (
  searchValue = '',
  timeout = 2000,
): [Item[], boolean, () => void] => {
  const [isLoading, setIsLoading] = useFlag();
  const [isStart, setIsStart] = useFlag();
  const [lenght, setLenght] = useState<number>(0);
  const isLoadingOffDebounce = useDebounce(setIsLoading.off, 2000);

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
    return new Array(lenght).fill(null).map((_, i) => ({
      label: `Опция ${i + 1}`,
      id: i,
    }));
  }, [lenght, searchValue]);

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
        setLenght((state) => state + 100);
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

  return [searchValue && isLoading ? [] : items, isLoading, setIsStart.on];
};

export const ComboboxExampleIsLoading = () => {
  const [value, setValue] = useState<Item[] | null>();
  const [data, isLoading, onOpen] = useMockLoadData();

  return (
    <Example col={1}>
      <Combobox
        placeholder="Загружу данные после того как по мне кликнут"
        items={data}
        value={value}
        onChange={({ value }) => setValue(value)}
        multiple
        onOpen={onOpen}
        isLoading={isLoading}
        virtualScroll
      />
    </Example>
  );
};

export const ComboboxExampleIsLoadingOnScrollBottom = () => {
  const [value, setValue] = useState<Item[] | null>();
  const [searchValue, setSearchValue] = useState<string>();
  const [data, isLoading, onOpen] = useMockLoadData(searchValue);

  return (
    <Example col={1}>
      <Combobox
        placeholder="Загружу данные после того как по мне кликнут"
        items={data}
        value={value}
        onChange={({ value }) => setValue(value)}
        multiple
        onOpen={onOpen}
        isLoading={isLoading}
        virtualScroll
        onScrollToBottom={searchValue ? undefined : onOpen}
        searchFunction={() => true}
        onInputChange={({ value }) => setSearchValue(value || '')}
      />
    </Example>
  );
};
