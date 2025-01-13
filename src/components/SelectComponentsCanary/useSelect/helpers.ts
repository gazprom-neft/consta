import React from 'react';

import { scrollIntoView } from '##/utils/scrollIntoView';

type State = {
  searchValue: string;
  resolvedSearchValue: string;
  isOpen: boolean;
  highlightedIndex: number;
  scrollToHighlighted: boolean;
};
type Action = string;
type Reducer = (state: State, newState: State, action: Action) => State;
type Updater = (state: State) => State;

export function useHoistedState(
  initialState: State,
): [State, (updater: Updater, action: Action) => void] {
  const reducerRef = React.useRef<Reducer>((old, newState) => newState);
  const [state, _setState] = React.useState<State>(initialState);
  const setState = React.useCallback(
    (updater: Updater, action: Action) => {
      if (!action) {
        throw new Error('An action type is required to update the state');
      }
      return _setState((old) => reducerRef.current(old, updater(old), action));
    },
    [_setState],
  );
  return [state, setState];
}

type ScrollToIndexFunctionType = (
  optionIndex: number,
  dropdownRef: React.MutableRefObject<HTMLDivElement | null>,
  optionsRefs: React.RefObject<HTMLDivElement>[],
  onFailure: () => void,
) => void;

export const scrollToIndex: ScrollToIndexFunctionType = (
  index,
  dropdownRef,
  optionsRefs,
  onFailure,
): void => {
  if (!dropdownRef.current || index < 0) {
    return;
  }

  const element = optionsRefs[index]?.current;

  if (element) {
    scrollIntoView(element, dropdownRef.current);
  } else {
    onFailure();
  }
};
