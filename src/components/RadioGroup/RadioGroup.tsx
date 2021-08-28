import './RadioGroup.css';

import React from 'react';

import { useChoiceGroup } from '../../hooks/useChoiceGroup/useChoiceGroup';
import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributesAndRef } from '../../utils/types/PropsWithHTMLAttributes';
import { Radio } from '../Radio/Radio';

export const cnRadioGroup = cn('RadioGroup');

export const radioGroupDirections = ['column', 'row'] as const;
export type RadioGroupDirection = typeof radioGroupDirections[number];
export const radioGroupDefaultDirection: RadioGroupDirection = radioGroupDirections[0];

export const radioGroupSizes = ['m', 'l'] as const;
export type RadioGroupPropSize = typeof radioGroupSizes[number];
export const radioGroupDefaultSize: RadioGroupPropSize = radioGroupSizes[0];

export const radioGroupViews = ['primary', 'ghost'] as const;
export type RadioGroupPropView = typeof radioGroupViews[number];
export const radioGroupDefaultView: RadioGroupPropView = radioGroupViews[0];

export const radioGroupPropAlign = ['center', 'top'] as const;
export type RadioGroupPropAlign = typeof radioGroupPropAlign[number];
export const radioGroupPropAlignDefault: RadioGroupPropAlign = radioGroupPropAlign[0];

type CommonProps<ITEM> = {
  align?: RadioGroupPropAlign;
  value?: ITEM | null;
  items: ITEM[];
  getLabel: (item: ITEM) => string;
  getDisabled?: (item: ITEM) => boolean | undefined;
  onChange: (props: { e: React.ChangeEvent<HTMLInputElement>; value: ITEM }) => void;
  name?: string;
  direction?: RadioGroupDirection;
  size?: RadioGroupPropSize;
  view?: RadioGroupPropView;
  disabled?: boolean;
  className?: string;
};

type Props<ITEM> = PropsWithHTMLAttributesAndRef<CommonProps<ITEM>, HTMLDivElement>;

type RadioGroup = <ITEM>(props: Props<ITEM>) => React.ReactElement | null;

export const RadioGroup: RadioGroup = React.forwardRef((props, ref) => {
  const {
    value = null,
    items,
    getLabel,
    getDisabled,
    onChange,
    name,
    direction = radioGroupDefaultDirection,
    size = radioGroupDefaultSize,
    view = radioGroupDefaultView,
    align = radioGroupPropAlignDefault,
    disabled = false,
    className,
    ...otherProps
  } = props;

  const { getOnChange, getChecked } = useChoiceGroup({
    value,
    getKey: getLabel,
    callBack: onChange,
    multiple: false,
  });

  return (
    <div {...otherProps} ref={ref} className={cnRadioGroup({ direction, size, view }, [className])}>
      {items.map((item) => (
        <Radio
          align={align}
          key={getLabel(item)}
          label={getLabel(item)}
          size={size}
          view={view}
          name={name}
          disabled={disabled || (!!getDisabled && getDisabled(item))}
          checked={getChecked(item)}
          onChange={({ e }) => getOnChange(item)(e)}
          className={cnRadioGroup('Item')}
        />
      ))}
    </div>
  );
});
