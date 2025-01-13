import { RefObject, useLayoutEffect, useState } from 'react';

import { useMutableRef } from '##/hooks/useMutableRef';

export const useResizeObserved = <
  ELEMENT extends HTMLElement | SVGGraphicsElement,
  RETURN_TYPE,
>(
  refs: Array<RefObject<ELEMENT>>,
  mapper: (el: ELEMENT | null) => RETURN_TYPE,
): RETURN_TYPE[] => {
  const calculateDimensionsRef = useMutableRef(() =>
    refs.map((ref) => mapper(ref.current)),
  );

  const [dimensions, setDimensions] = useState<RETURN_TYPE[]>(
    calculateDimensionsRef.current,
  );

  useLayoutEffect(() => {
    setDimensions(calculateDimensionsRef.current);
  }, [refs]);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setDimensions(calculateDimensionsRef.current);
    });

    for (const ref of refs) {
      ref.current && resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [refs]);

  return dimensions;
};
