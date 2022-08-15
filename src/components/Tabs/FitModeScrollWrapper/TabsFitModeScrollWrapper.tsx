import './TabsFitModeScrollWrapper.css';

import React from 'react';

import { useResizeObserved } from '../../../hooks/useResizeObserved/useResizeObserved';
import { useScrollPosition } from '../../../hooks/useScrollPosition/useScrollPosition';
import { IconArrowLeft } from '../../../icons/IconArrowLeft/IconArrowLeft';
import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { getTabsWidth, getVisibleTabsRange } from '../helpers';
import { TabsFitModeWrapperProps } from '../types';

const cnTabsFitModeScrollWrapper = cn('TabsFitModeScrollWrapper');

export const TabsFitModeScrollWrapper = <ITEM,>({
  tabsDimensions,
  items,
  renderItemsList,
  getItemChecked,
}: TabsFitModeWrapperProps<ITEM>): React.ReactElement | null => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [
    { isScrollable, width: containerWidth, paddingLeft: containerPaddingLeft },
  ] = useResizeObserved(
    React.useMemo(() => [scrollContainerRef], [scrollContainerRef]),
    (el) => ({
      isScrollable: el && el.scrollWidth > el.offsetWidth,
      width: el?.offsetWidth ?? 0,
      paddingLeft: el ? parseInt(getComputedStyle(el).paddingLeft, 10) : 0,
    }),
  );
  const { scrollLeft } = useScrollPosition(scrollContainerRef.current);

  const [firstVisibleTabIdx, lastVisibleTabIdx] = getVisibleTabsRange({
    tabsDimensions,
    containerWidth,
    containerPaddingLeft,
    scrollLeft,
  });

  const scrollTabIntoView = (idx: number) => {
    const tabIsVisible = idx >= firstVisibleTabIdx && idx <= lastVisibleTabIdx;

    if (!tabIsVisible) {
      const previousTabsWidth = getTabsWidth(tabsDimensions.slice(0, idx));
      scrollContainerRef.current?.scrollTo({
        left: previousTabsWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollPrev = () => {
    scrollTabIntoView(firstVisibleTabIdx - 1);
  };

  const scrollNext = () => {
    scrollTabIntoView(lastVisibleTabIdx + 1);
  };

  // Подскролливаем к выбранному табу
  const checkedTabIdx = items.findIndex(getItemChecked);
  React.useEffect(() => {
    if (isScrollable) {
      scrollTabIntoView(checkedTabIdx);
    }
  }, [checkedTabIdx, isScrollable]);

  return (
    <div className={cnTabsFitModeScrollWrapper()}>
      {isScrollable && (
        <>
          {(['prev', 'next'] as const).map((buttonTo) => (
            <Button
              key={buttonTo}
              view="clear"
              size="xs"
              onlyIcon
              disabled={
                buttonTo === 'prev'
                  ? firstVisibleTabIdx === 0
                  : lastVisibleTabIdx === items.length - 1
              }
              iconLeft={buttonTo === 'prev' ? IconArrowLeft : IconArrowRight}
              className={cnTabsFitModeScrollWrapper('Button', { to: buttonTo })}
              onClick={buttonTo === 'prev' ? scrollPrev : scrollNext}
            />
          ))}
        </>
      )}
      <div
        className={cnTabsFitModeScrollWrapper('Content')}
        ref={scrollContainerRef}
      >
        {renderItemsList({
          getTabClassName: (idx) =>
            cnTabsFitModeScrollWrapper('Tab', {
              noMargin: idx === items.length - 1,
            }),
        })}
      </div>
    </div>
  );
};
