import './CalendarItem.css';

import React from 'react';
import { classnames } from '@bem-react/classnames';

import { cn } from '../../../utils/bem';
import { PropsWithJsxAttributes } from '../../../utils/types/PropsWithJsxAttributes';
import { useTheme } from '../../Theme/Theme';

export type CalendarItemProps = PropsWithJsxAttributes<
  {
    label: number | string;
    current?: boolean;
    selected?: boolean;
    disabled?: boolean;
    event?: boolean;
    role?: never;
    children?: never;
  },
  'div'
>;

export const cnCalendarItem = cn('CalendarItem');

export const CalendarItem = React.forwardRef<HTMLDivElement, CalendarItemProps>((props, ref) => {
  const { label, current, selected, event, disabled, ...otherProps } = props;
  const { themeClassNames } = useTheme();

  const className =
    selected && !disabled
      ? classnames(props.className, themeClassNames.color.accent)
      : props.className;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cnCalendarItem({ event, current, disabled, selected }, [className])}
      role="button"
    >
      {label}
    </div>
  );
});
