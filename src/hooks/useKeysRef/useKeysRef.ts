import React, { useEffect } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';
import { KeyCode } from '##/utils/types/KeyCode';

export type KeyHandlers = Partial<
  Record<KeyCode, (e: KeyboardEvent) => void>
> & {
  [key: string]: (e: KeyboardEvent) => void;
};

type UseKeysProps = {
  ref?: React.RefObject<HTMLElement>;
  keys: KeyHandlers;
  isActive?: boolean;
  eventHandler?: (event: KeyboardEvent) => void;
  eventType?: 'keypress' | 'keydown' | 'keyup';
};

export const useKeysRef = (params: UseKeysProps) => {
  const {
    ref,
    keys,
    isActive = false,
    eventType = 'keydown',
    eventHandler,
  } = params;

  const keysRef = useMutableRef(keys);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (isActive) {
        (
          keysRef.current[e.code as KeyCode] ||
          keysRef.current[e.key as KeyCode]
        )?.(e);
      }
      eventHandler?.(e);
    };

    ref?.current?.addEventListener(eventType, fn);

    return () => {
      ref?.current?.removeEventListener(eventType, fn);
    };
  }, [ref?.current, eventType]);
};
