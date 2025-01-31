import './BookmarkTabs.css';

import { IconAdd } from '@consta/icons/IconAdd';
import { IconArrowLeft } from '@consta/icons/IconArrowLeft';
import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef, useMemo, useState } from 'react';

import { useComponentSize } from '##/hooks/useComponentSize';
import { useForkRef } from '##/hooks/useForkRef';
import { cnMixScrollBar } from '##/mixs/MixScrollBar';
import { cn } from '##/utils/bem';

import { Button } from '../Button';
import { BookmarkTabsTab } from './BookmarkTabsTab';
import { withDefaultGetters } from './helper';
import {
  BookmarkTabsComponent,
  bookmarkTabsPropFormDefault,
  BookmarkTabsProps,
  bookmarkTabsPropSizeDefault,
  bookmarkTabsPropViewDefault,
  BookmarkTabsRenderItemProps,
} from './types';
import { useBookmarkTabs } from './useBookmarkTabs';

export const cnBookmarkTabs = cn('BookmarkTabs');

const renderItemDefault = <ITEM,>(
  props: BookmarkTabsRenderItemProps<ITEM>,
): React.ReactElement => {
  const { item: _item, attributes = {}, as, ...otherProps } = props;
  return <BookmarkTabsTab {...attributes} {...otherProps} as={as} />;
};

const BookmarkTabsRender = (
  props: BookmarkTabsProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    items = [],
    value,
    onCreate,
    getItemKey,
    getItemLabel,
    getItemLeftIcon,
    getItemRightIcon,
    getItemAs,
    getItemRef,
    getItemAttributes,
    getItemFixed,
    onChange,
    onRemove,
    renderItem: renderItemProp = renderItemDefault,
    size = bookmarkTabsPropSizeDefault,
    form = bookmarkTabsPropFormDefault,
    view = bookmarkTabsPropViewDefault,
    withNavigationButtons,
    onMouseLeave: onMouseLeaveProp,
    className,
    id,
    ...otherProps
  } = withDefaultGetters(props);

  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  type Item = typeof items[number];

  const getItemActive = (item: Item) => {
    return value ? getItemKey(item) === getItemKey(value) : false;
  };

  const {
    refs,
    fixedTabs,
    fixedTabsRef,
    otherTabs,
    otherTabsRef,
    showControls,
    wrapperRef,
    containerRef,
    controlsRef,
    addButtonRef,
    navigate,
    sizes,
  } = useBookmarkTabs({
    items,
    getItemFixed,
    size,
    withNavigationButtons,
    withAddButton: !!onCreate,
  });

  const { width: fixedWidth } = useComponentSize(fixedTabsRef);

  const renderItem = (
    item: Item,
    fixed: boolean,
    controlRef: React.RefObject<HTMLDivElement>,
    bordered: boolean,
    index: number,
    tabWidth?: string,
  ) => (
    <div
      className={cnBookmarkTabs('Tab')}
      onMouseEnter={() => setHighlightedIndex(index)}
      onFocus={() => setHighlightedIndex(index)}
      ref={controlRef}
    >
      {renderItemProp({
        item,
        onClick: (e) => onChange?.(item, { e }),
        active: getItemActive(item),
        label: getItemLabel(item),
        leftIcon: getItemLeftIcon(item),
        rightIcon: getItemRightIcon(item),
        as: getItemAs(item) ?? 'div',
        attributes: getItemAttributes(item),
        tabRef: getItemRef(item),
        fixed,
        bordered,
        onClose: onRemove ? (e) => onRemove(item, { e }) : undefined,
        size,
        view,
        hovered: highlightedIndex === index,
        form,
        tabWidth,
      })}
    </div>
  );

  const onMouseLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
    onMouseLeaveProp?.(e);
    setHighlightedIndex(null);
  };

  const borderedIndexes = useMemo(() => {
    const arr = [...fixedTabs, ...otherTabs];
    const activeIndex = value ? arr.indexOf(value) : -1;
    return Array.from(Array(arr.length).keys())
      .slice(undefined, -1)
      .filter((el) =>
        form === 'round' ? el !== activeIndex && el !== activeIndex - 1 : true,
      );
  }, [fixedTabs, otherTabs, value, form]);

  return (
    <div
      className={cnBookmarkTabs({ size, view, form }, [className])}
      ref={useForkRef([ref, containerRef])}
      id={id}
      onMouseLeave={onMouseLeave}
      {...otherProps}
    >
      {showControls && (
        <div ref={controlsRef} className={cnBookmarkTabs('ScrollControls')}>
          <div className={cnBookmarkTabs('Button')}>
            <Button
              view="clear"
              size="xs"
              type="button"
              onClick={() => navigate('prev')}
              iconLeft={IconArrowLeft}
              onlyIcon
            />
          </div>
          <div className={cnBookmarkTabs('Button')}>
            <Button
              view="clear"
              size="xs"
              type="button"
              onClick={() => navigate('next')}
              iconLeft={IconArrowRight}
              onlyIcon
            />
          </div>
        </div>
      )}
      <div
        ref={wrapperRef}
        className={cnBookmarkTabs(
          'Wrapper',
          cnMixScrollBar({ invisible: true }),
        )}
      >
        <div
          style={{
            ['--bookmarks-list-width' as string]: `max-content`,
          }}
          ref={fixedTabsRef}
          className={cnBookmarkTabs('List')}
        >
          {fixedTabs.map((item, index) => (
            <React.Fragment key={getItemKey(item)}>
              {renderItem(
                item,
                true,
                refs[index],
                borderedIndexes.includes(index),
                index,
              )}
            </React.Fragment>
          ))}
        </div>
        <div
          style={{
            ['--bookmarks-list-width' as string]: `calc(100% - ${fixedWidth}px)`,
          }}
          className={cnBookmarkTabs('List')}
          ref={otherTabsRef}
        >
          {otherTabs.map((item, index) => {
            const { length } = fixedTabs;
            return (
              <React.Fragment key={getItemKey(item)}>
                {renderItem(
                  item,
                  false,
                  refs[length + index],
                  borderedIndexes.includes(length + index),
                  length + index,
                  sizes[index],
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {onCreate && (
        <div
          ref={addButtonRef}
          className={cnBookmarkTabs('Button', { type: 'add' })}
        >
          <Button
            view="clear"
            size="xs"
            type="button"
            onClick={onCreate}
            iconLeft={IconAdd}
            onlyIcon
          />
        </div>
      )}
      <div className={cnBookmarkTabs('Empty')} />
    </div>
  );
};

export const BookmarkTabs = forwardRef(
  BookmarkTabsRender,
) as BookmarkTabsComponent;
