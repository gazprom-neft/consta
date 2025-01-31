import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { AsAttributes, AsTags } from '##/utils/types/AsTags';
import { PropsWithAsAttributes } from '##/utils/types/PropsWithAsAttributes';

import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export type TabDimensions = {
  size: number;
  gap: number;
};

export type TabsItemDefault = {
  label: string | number;
  leftIcon?: IconComponent;
  rightIcon?: IconComponent;
  rightSide?: React.ReactNode;
  leftSide?: React.ReactNode;
  disabled?: boolean;
  as?: AsTags;
  ref?: React.RefObject<HTMLElement>;
  attributes?: AsAttributes;

  /**
   * @deprecated since version 4.11.0 use leftIcon
   */
  icon?: IconComponent;
};

export const tabsSizes = ['m', 's', 'xs'] as const;
export type TabsPropSize = typeof tabsSizes[number];
export const tabsDefaultSize: TabsPropSize = tabsSizes[0];

export const tabsViews = ['bordered', 'clear'] as const;
export type TabsPropView = typeof tabsViews[number];
export const tabsDefaultView: TabsPropView = tabsViews[0];

export const tabsLinePositions = ['bottom', 'top', 'left', 'right'] as const;
export type TabsPropLinePosition = typeof tabsLinePositions[number];
export const tabsDefaultLinePosition: TabsPropLinePosition = 'bottom';

export const tabsFitModes = ['scroll', 'dropdown'] as const;
export type TabsPropFitMode = typeof tabsFitModes[number];
export const tabsDefaultFitMode: TabsPropFitMode = 'dropdown';

export type TabsPropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type TabsPropGetItemLabel<ITEM> = (item: ITEM) => string | number;
export type TabsPropGetItemChecked<ITEM> = (item: ITEM) => boolean | undefined;
export type TabsPropGetItemIcon<ITEM> = (
  item: ITEM,
) => IconComponent | undefined;
export type TabsPropGetItemSide<ITEM> = (
  item: ITEM,
) => React.ReactNode | undefined;

export type TabsPropGetItemAs<ITEM> = (item: ITEM) => AsTags | undefined;
export type TabsPropGetItemAttributes<ITEM> = (
  item: ITEM,
) => TabsItemDefault['attributes'];
export type TabsPropGetItemRef<ITEM> = (
  item: ITEM,
) => React.RefObject<HTMLElement> | undefined;

export type TabsPropGetItemDisabled<ITEM> = (item: ITEM) => boolean | undefined;

export type TabsPropOnChange<ITEM> = (
  value: ITEM,
  props: {
    e: React.MouseEvent | React.KeyboardEvent;
  },
) => void;

export type RenderItemProps<ITEM> = {
  item: ITEM;
  onChange: React.MouseEventHandler;
  checked: boolean;
  size: TabsPropSize;
  iconSize?: IconPropSize;
  onlyIcon?: boolean;
  label: string;
  tabRef?: React.RefObject<HTMLElement>;
  renderInDropdown?: boolean;
} & Omit<TabsItemDefault, 'label' | 'ref'>;

export type RenderItem<ITEM> = (
  props: RenderItemProps<ITEM>,
) => React.ReactElement | null;

export type TabsFitModeWrapperProps<ITEM> = {
  items: ITEM[];
  tabsDimensions: TabDimensions[];
  getItemKey: TabsPropGetItemKey<ITEM>;
  getItemChecked: TabsPropGetItemChecked<ITEM>;
  renderItem: (item: ITEM) => React.ReactNode;
  renderItemsList: RenderItemsListProp;
  onChange: TabsPropOnChange<ITEM>;
  tabRefs: Array<React.RefObject<HTMLElement>>;
  size: TabsPropSize;
  withScrollButtons?: boolean;
};

export type TabsProps<ITEM = TabsItemDefault> = PropsWithHTMLAttributesAndRef<
  {
    size?: TabsPropSize;
    onlyIcon?: boolean;
    view?: TabsPropView;
    iconSize?: IconPropSize;
    items: ITEM[];
    value?: ITEM | null;
    getItemKey?: TabsPropGetItemKey<ITEM>;
    getItemLabel?: TabsPropGetItemLabel<ITEM>;
    getItemLeftIcon?: TabsPropGetItemIcon<ITEM>;
    getItemRightIcon?: TabsPropGetItemIcon<ITEM>;
    getItemLeftSide?: TabsPropGetItemSide<ITEM>;
    getItemRightSide?: TabsPropGetItemSide<ITEM>;
    getItemDisabled?: TabsPropGetItemDisabled<ITEM>;
    getItemAs?: TabsPropGetItemAs<ITEM>;
    getItemAttributes?: TabsPropGetItemAttributes<ITEM>;
    getItemRef?: TabsPropGetItemRef<ITEM>;
    children?: never;
    onChange: TabsPropOnChange<ITEM>;
    renderItem?: RenderItem<ITEM>;
    disabled?: boolean;

    /**
     * @deprecated since version 4.11.0 use getItemLeftIcon
     */
    getItemIcon?: TabsPropGetItemIcon<ITEM>;
  } & (
    | ({
        linePosition?: Extract<TabsPropLinePosition, 'bottom' | 'top'>;
      } & (
        | {
            fitMode?: 'scroll';
            withScrollButtons?: boolean;
          }
        | {
            fitMode?: 'dropdown';
            withScrollButtons?: never;
          }
      ))
    | {
        linePosition: Extract<TabsPropLinePosition, 'left' | 'right'>;
        fitMode?: never;
        withScrollButtons?: never;
      }
  ),
  HTMLDivElement
> &
  (ITEM extends { label: TabsItemDefault['label'] }
    ? {}
    : {
        getItemLabel: TabsPropGetItemLabel<ITEM>;
      });

export type TabsComponent = <ITEM>(
  props: TabsProps<ITEM>,
) => React.ReactElement | null;

export type TabsTabProps<AS extends AsTags = 'button'> = PropsWithAsAttributes<
  {
    onChange: React.MouseEventHandler;
    checked: boolean;
    size: TabsPropSize;
    iconSize?: IconPropSize;
    onlyIcon?: boolean;
    className?: string;
    label: string;
    tabRef?: React.RefObject<HTMLElement>;
    renderInDropdown?: boolean;
  } & Omit<TabsItemDefault, 'label' | 'ref' | 'attributes'>,
  AS
>;

export type TabsTabComponent = <AS extends AsTags = 'button'>(
  props: TabsTabProps<AS>,
) => React.ReactElement | null;

export type TabsMoreItemsProps<ITEM = TabsItemDefault> =
  PropsWithHTMLAttributesAndRef<
    {
      items: ITEM[];
      renderItem: (
        item: ITEM,
        onClick: () => void,
        renderInDropdown?: boolean,
      ) => React.ReactNode;
      getItemKey: TabsPropGetItemKey<ITEM>;
      onChange: TabsPropOnChange<ITEM>;
      height: number;
      size: TabsPropSize;
    } & React.RefAttributes<HTMLDivElement>,
    HTMLDivElement
  >;

export type TabsMoreItemsComponent = <ITEM>(
  props: TabsMoreItemsProps<ITEM>,
) => React.ReactElement | null;

export type RenderItemsListProp = (props: {
  visibleIndexes?: number[];
  withRunningLine?: boolean;
  getTabClassName?: (idx: number) => string | undefined;
}) => React.ReactNode;

export type TabsDirection = 'horizontal' | 'vertical';
