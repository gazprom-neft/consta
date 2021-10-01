import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';

export const propSize = ['s', 'xs', 'm'] as const;
export type PropSize = typeof propSize[number];
export const propSizeDefault = propSize[0];

export const propDirection = ['horizontal', 'vertical'] as const;
export type PropDirection = typeof propDirection[number];
export const propDirectionDefault = propDirection[0];

export const propStatus = ['system', 'normal', 'success', 'warning', 'alert'] as const;
export type PropStatus = typeof propStatus[number];
export const propStatusDefault = propStatus[0];

export const pointNumbersMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type PointNumbersMap = typeof pointNumbersMap[number];

export type PropGetItemLabel<ITEM> = (item: ITEM) => string;
export type PropGetItemKey<ITEM> = (item: ITEM) => string | number;
export type PropGetItemTooltipContent<ITEM> = (item: ITEM) => string | undefined;
export type PropGetItemPoint<ITEM> = (item: ITEM) => PointNumbersMap | SVGElement | undefined;
export type PropGetItemProgress<ITEM> = (item: ITEM) => number | undefined;
export type PropGetItemContent<ITEM> = (item: ITEM) => React.ReactNode | undefined;
export type PropGetItemStatus<ITEM> = (item: ITEM) => PropStatus | undefined;
export type PropGetItemOnCLick<ITEM> = (
  item: ITEM,
) => React.EventHandler<React.MouseEvent> | undefined;

export type DefaultItem = {
  label: string;
  id: string | number;
  tooltipContent?: string;
  point?: PointNumbersMap | SVGElement;
  status?: PropStatus;
  progress?: number;
  content?: React.ReactNode;
  onClick?: React.EventHandler<React.MouseEvent>;
};

export type ProgressStepBarProps<ITEM = DefaultItem> = PropsWithHTMLAttributesAndRef<
  {
    steps: ITEM[];
    direction?: PropDirection;
    size?: PropSize;
    getItemLabel?: PropGetItemLabel<ITEM>;
    getItemKey?: PropGetItemKey<ITEM>;
    getItemTooltipContent?: PropGetItemTooltipContent<ITEM>;
    getItemPoint?: PropGetItemPoint<ITEM>;
    getItemProgress?: PropGetItemProgress<ITEM>;
    getItemContent?: PropGetItemContent<ITEM>;
    getItemOnClick?: PropGetItemOnCLick<ITEM>;
    getItemStatus?: PropGetItemStatus<ITEM>;
  },
  HTMLDivElement
> &
  (ITEM extends { label: DefaultItem['label'] } ? {} : { getItemLabel: PropGetItemLabel<ITEM> }) &
  (ITEM extends { id: DefaultItem['id'] } ? {} : { getItemKey: PropGetItemKey<ITEM> });

export const cnProgressStepBar = cn('ProgressStepBar');

export const defaultGetItemKey: PropGetItemKey<DefaultItem> = (item) => item.id;
export const defaultGetItemLabel: PropGetItemLabel<DefaultItem> = (item) => item.label;
export const defaultGetItemTooltipContent: PropGetItemTooltipContent<DefaultItem> = (item) =>
  item.tooltipContent;
export const defaultGetItemPoint: PropGetItemPoint<DefaultItem> = (item) => item.point;
export const defaultGetItemProgress: PropGetItemProgress<DefaultItem> = (item) => item.progress;
export const defaultGetItemContent: PropGetItemContent<DefaultItem> = (item) => item.content;
export const defaultGetItemOnCLick: PropGetItemOnCLick<DefaultItem> = (item) => item.onClick;
export const defaultGetItemStatus: PropGetItemStatus<DefaultItem> = (item) => item.status;

export type ProgressStepBarComponent = <ITEM = DefaultItem>(
  props: ProgressStepBarProps<ITEM>,
) => React.ReactElement | null;

export function withDefaultGetters<ITEM>(props: ProgressStepBarProps<ITEM>) {
  return {
    ...props,
    getItemLabel: props.getItemLabel || defaultGetItemLabel,
    getItemKey: props.getItemKey || defaultGetItemKey,
    getItemTooltipContent: props.getItemTooltipContent || defaultGetItemTooltipContent,
    getItemPoint: props.getItemPoint || defaultGetItemPoint,
    getItemProgress: props.getItemProgress || defaultGetItemProgress,
    getItemContent: props.getItemContent || defaultGetItemContent,
    getItemOnClick: props.getItemOnClick || defaultGetItemOnCLick,
    getItemStatus: props.getItemStatus || defaultGetItemStatus,
  };
}
