import { useLayoutEffect, useState } from 'react';

import { isEq } from '##/hooks/useBreakpoints/isEq';
import { mapping } from '##/hooks/useBreakpoints/mapping';
import { useMutableRef } from '##/hooks/useMutableRef';

type Map<POINTS extends string> = Record<POINTS, number>;
type Returned<POINTS extends string> = Record<POINTS, boolean>;

const getWidth = (ref: React.RefObject<HTMLElement | SVGGraphicsElement>) =>
  ref.current?.getBoundingClientRect().width || 0;

export const useComponentBreakpoints = <POINTS extends string>(
  ref: React.RefObject<HTMLElement | SVGGraphicsElement>,
  map: Map<POINTS>,
) => {
  const [points, setSetPoints] = useState<Returned<POINTS>>(() =>
    mapping(getWidth(ref), map),
  );

  const mapRef = useMutableRef(map);

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const newPoints = mapping(getWidth(ref), mapRef.current);
      setSetPoints((state) => (isEq(state, newPoints) ? state : newPoints));
    });

    ref.current && resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);

  return points;
};
