import './CalendarSlider.css';

import React from 'react';

import { IconForward } from '../../../icons/IconForward/IconForward';
import { cn } from '../../../utils/bem';
import { PropsWithHTMLAttributes } from '../../../utils/types/PropsWithHTMLAttributes';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

type Data = {
  label: string | number;
  current?: boolean;
  valueRange?: number[];
  date: Date;
  items: {
    label: string;
    date: Date;
    current?: boolean;
  }[];
};

export type CalendarSliderProps = PropsWithHTMLAttributes<
  {
    onChange?: (date: Date) => void;
    onPrev?: () => void;
    onNext?: () => void;
    children?: never;
    data: Data[];
  },
  HTMLDivElement
>;

export const cnCalendarSlider = cn('CalendarSlider');

const getCurrentItem = (data: Data[]) => {
  const index = data.find((item) => item.current)?.items.findIndex((item) => item.current) || 0;

  return index < 0 ? 0 : index;
};

export const CalendarSlider: React.FC<CalendarSliderProps> = (props) => {
  const { className, onChange, data, onPrev, onNext, ...otherProps } = props;

  const currentItemIndex = getCurrentItem(data);

  return (
    <div {...otherProps} className={cnCalendarSlider(null, [className])}>
      <Button
        className={cnCalendarSlider('Button', { direction: 'prev' })}
        view="ghost"
        iconLeft={IconForward}
        onClick={onPrev}
      />
      <div
        className={cnCalendarSlider('Slider')}
        style={{ ['--current-item' as string]: currentItemIndex }}
      >
        <div className={cnCalendarSlider('SliderBody')}>
          <div className={cnCalendarSlider('Selector')} />
          {data.map((year, index) => (
            <Text
              className={cnCalendarSlider('ParentLabel', { position: index.toString() })}
              weight="bold"
              size="s"
              key={year.label}
              view={year.current ? undefined : 'ghost'}
            >
              {year.label}
            </Text>
          ))}
          {data.map((year, index) => (
            <div
              key={year.label}
              className={cnCalendarSlider('Parent', {
                position: index.toString(),
                selected: !!year.valueRange,
              })}
              style={
                year.valueRange && {
                  ['--value-offset' as string]: `${year.valueRange[0]}%`,
                  ['--value-width' as string]: `${year.valueRange[1]}%`,
                }
              }
            >
              {year.items.map((item, index) => (
                <button
                  className={cnCalendarSlider('Item')}
                  key={index}
                  onFocus={() => onChange?.(item.date)}
                  type="button"
                >
                  <Text
                    className={cnCalendarSlider('ItemLabel')}
                    size="2xs"
                    view="ghost"
                    align="center"
                  >
                    {item.label}
                  </Text>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        className={cnCalendarSlider('Button', { direction: 'next' })}
        view="ghost"
        iconLeft={IconForward}
        onClick={onNext}
      />
    </div>
  );
};
