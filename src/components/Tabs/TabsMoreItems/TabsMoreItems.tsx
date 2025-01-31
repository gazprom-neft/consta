import './TabsMoreItems.css';

import { IconMeatball } from '@consta/icons/IconMeatball';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';

import { Button } from '##/components/Button';
import { ListBox } from '##/components/ListCanary';
import { Direction, Popover } from '##/components/Popover/Popover';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cn } from '##/utils/bem';

import { TabsMoreItemsComponent, TabsMoreItemsProps } from '../types';

const cnTabsMoreItems = cn('TabsMoreItems');

const TabsMoreItemsRender = (
  props: TabsMoreItemsProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const { items, renderItem, getItemKey, height, size, onChange } = props;
  const [isOpen, setIsOpen] = useFlag(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<Direction>('downStartLeft');
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const highlightRef: React.MutableRefObject<number> = useRef(-1);
  const openRef: React.MutableRefObject<boolean> = useRef(false);

  const handleKeyDown: React.KeyboardEventHandler = useCallback(
    (e) => {
      const preventDefault = () => {
        e.stopPropagation();
        e.preventDefault();
      };

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        preventDefault();
        const value = highlightRef.current + (e.key === 'ArrowDown' ? 1 : -1);
        setHighlightIndex(Math.min(Math.max(value, 0), items.length));
        return;
      }
      if (e.key === 'Enter') {
        preventDefault();
        if (!openRef.current) {
          setIsOpen.on();
          return;
        }
        const value = items[highlightRef.current];
        value && onChange?.(value, { e });
        setIsOpen.off();
        return;
      }
      if (e.key === 'Escape') {
        preventDefault();
        setIsOpen.off();
      }
    },
    [items],
  );

  useEffect(() => {
    items.length === 0 && setIsOpen.off();
  }, [items]);

  useEffect(() => {
    highlightRef.current = highlightIndex;
  }, [highlightIndex]);

  useEffect(() => {
    openRef.current = isOpen;
    if (!isOpen) {
      setHighlightIndex(-1);
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={useForkRef([ref, buttonRef])}
        className={cnTabsMoreItems('Button')}
        style={{ height }}
      >
        <Button
          size="xs"
          type="button"
          view="ghost"
          onlyIcon
          iconLeft={IconMeatball}
          onClick={setIsOpen.toggle}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Transition
        in={isOpen}
        unmountOnExit
        nodeRef={popoverRef}
        timeout={animateTimeout}
      >
        {(animate) => (
          <Popover
            anchorRef={buttonRef}
            offset={-1}
            ref={popoverRef}
            direction="downStartRight"
            onClickOutside={setIsOpen.off}
            spareDirection="downStartLeft"
            className={cnTabsMoreItems('Popover', [
              cnMixPopoverAnimate({ animate, direction }),
            ])}
            onSetDirection={setDirection}
            possibleDirections={[
              'downStartRight',
              'downStartLeft',
              'upStartRight',
              'upStartLeft',
              'downCenter',
              'upCenter',
            ]}
          >
            <ListBox
              shadow
              border
              size={size}
              form="default"
              className={cnTabsMoreItems('Content')}
            >
              {items.map((item, i) => (
                <div
                  key={getItemKey(item)}
                  className={cnTabsMoreItems('Item', {
                    active: highlightIndex === i,
                  })}
                >
                  {renderItem(item, setIsOpen.off, true)}
                </div>
              ))}
            </ListBox>
          </Popover>
        )}
      </Transition>
    </>
  );
};

export const TabsMoreItems = forwardRef(
  TabsMoreItemsRender,
) as TabsMoreItemsComponent;
