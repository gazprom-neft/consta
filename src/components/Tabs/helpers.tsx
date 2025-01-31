import { TabsFitModeDropdownWrapper } from './TabsFitModeDropdownWrapper/TabsFitModeDropdownWrapper';
import { TabsFitModeScrollWrapper } from './TabsFitModeScrollWrapper/TabsFitModeScrollWrapper';
import { TabsListWrapper } from './TabsListWrapper';
import {
  TabDimensions,
  TabsDirection,
  TabsItemDefault,
  TabsPropFitMode,
  TabsPropGetItemAs,
  TabsPropGetItemAttributes,
  TabsPropGetItemDisabled,
  TabsPropGetItemIcon,
  TabsPropGetItemLabel,
  TabsPropGetItemRef,
  TabsPropGetItemSide,
  TabsPropLinePosition,
  TabsProps,
} from './types';

export const getTabsDirection = (
  linePosition: TabsPropLinePosition,
): TabsDirection =>
  linePosition === 'left' || linePosition === 'right'
    ? 'vertical'
    : 'horizontal';

export const getTabsWidth = (tabsDimensions: TabDimensions[]): number =>
  tabsDimensions.reduce((acc, td) => acc + td.size + td.gap, 0);

export const getTabsWrapper = (
  tabsDirection: TabsDirection,
  fitMode: TabsPropFitMode,
) => {
  if (tabsDirection === 'vertical') {
    return TabsListWrapper;
  }

  return fitMode === 'scroll'
    ? TabsFitModeScrollWrapper
    : TabsFitModeDropdownWrapper;
};

const defaultGetItemLabel: TabsPropGetItemLabel<TabsItemDefault> = (item) =>
  item.label;
const defaultGetItemIcon: TabsPropGetItemIcon<TabsItemDefault> = (item) =>
  item.icon;
const defaultGetItemLeftIcon: TabsPropGetItemIcon<TabsItemDefault> = (item) =>
  item.leftIcon;
const defaultGetItemRightIcon: TabsPropGetItemIcon<TabsItemDefault> = (item) =>
  item.rightIcon;
const defaultGetItemLeftSide: TabsPropGetItemSide<TabsItemDefault> = (item) =>
  item.leftSide;
const defaultGetItemRightSide: TabsPropGetItemSide<TabsItemDefault> = (item) =>
  item.rightSide;
const defaultGetItemDisable: TabsPropGetItemDisabled<TabsItemDefault> = (
  item,
) => item.disabled;
const defaultGetItemAs: TabsPropGetItemAs<TabsItemDefault> = (item) => item.as;
const defaultGetItemAttributes: TabsPropGetItemAttributes<TabsItemDefault> = (
  item,
) => item.attributes;
const defaultGetItemRef: TabsPropGetItemRef<TabsItemDefault> = (item) =>
  item.ref;

export const withDefaultGetters = (props: TabsProps) => {
  return {
    ...props,
    getItemKey: props.getItemKey || defaultGetItemLabel,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemIcon: props.getItemIcon || defaultGetItemIcon,
    getItemLeftIcon: props.getItemLeftIcon || defaultGetItemLeftIcon,
    getItemRightIcon: props.getItemRightIcon || defaultGetItemRightIcon,
    getItemLeftSide: props.getItemLeftSide || defaultGetItemLeftSide,
    getItemRightSide: props.getItemRightSide || defaultGetItemRightSide,
    getItemDisabled: props.getItemDisabled || defaultGetItemDisable,
    getItemAs: props.getItemAs || defaultGetItemAs,
    getItemAttributes: props.getItemAttributes || defaultGetItemAttributes,
    getItemRef: props.getItemRef || defaultGetItemRef,
  };
};

export const getVisibleTabsRange = ({
  tabsDimensions,
  containerWidth,
  containerPaddingLeft,
  scrollLeft,
}: {
  tabsDimensions: TabDimensions[];
  containerWidth: number;
  containerPaddingLeft: number;
  scrollLeft: number;
}): [number, number] => {
  let firstVisibleTabIdx = null;
  let lastVisibleTabIdx = null;

  const containerLeftSide = scrollLeft;
  const containerRightSide = containerLeftSide + containerWidth;

  for (let idx = 0; idx < tabsDimensions.length; idx++) {
    const previousTabsWidth = getTabsWidth(tabsDimensions.slice(0, idx));
    const tabElLeftSide = containerPaddingLeft + previousTabsWidth;
    const isTabLeftSideVisible = tabElLeftSide >= containerLeftSide;
    if (isTabLeftSideVisible && firstVisibleTabIdx === null) {
      firstVisibleTabIdx = idx;
    }

    const tabElRightSide = tabElLeftSide + tabsDimensions[idx].size;
    const isTabRightSideVisible = tabElRightSide <= containerRightSide;
    if (isTabRightSideVisible) {
      lastVisibleTabIdx = idx;
    }
  }

  firstVisibleTabIdx = firstVisibleTabIdx ?? 0;
  lastVisibleTabIdx = Math.max(firstVisibleTabIdx, lastVisibleTabIdx ?? 0);

  return [firstVisibleTabIdx, lastVisibleTabIdx];
};
