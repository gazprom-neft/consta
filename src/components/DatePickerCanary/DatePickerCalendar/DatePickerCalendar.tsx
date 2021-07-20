import './DatePickerCalendar.css';

import React, { forwardRef } from 'react';
import { CSSTransition } from 'react-transition-group';

import { cn } from '../../../utils/bem';
import { cnForCssTransition } from '../../../utils/cnForCssTransition';
import { PropsWithHTMLAttributesAndRef } from '../../../utils/types/PropsWithHTMLAttributes';
import { Calendar } from '../../Calendar/Calendar';
import { Modal } from '../../Modal/Modal';
import { Popover } from '../../Popover/Popover';
import {
  DatePickerPropCalendarForm,
  datePickerPropCalendarFormDefault,
  DatePickerPropCalendarView,
  DatePickerPropOnChange,
  DatePickerPropType,
  DatePickerPropValue,
} from '../helpers';

export type DatePickerCalendarProps<
  TYPE extends DatePickerPropType = 'date'
> = PropsWithHTMLAttributesAndRef<
  {
    anchorRef: React.RefObject<HTMLElement>;
    currentVisibleDate?: Date;
    type?: TYPE;
    value?: DatePickerPropValue<TYPE>;
    onChange?: DatePickerPropOnChange<TYPE>;
    minDate?: Date;
    maxDate?: Date;
    events?: Date[];
    view?: DatePickerPropCalendarView;
    locale?: Locale;
    children?: never;
    form?: DatePickerPropCalendarForm;
    isOpen?: boolean;
    isMobile?: boolean;
    onChangeCurrentVisibleDate?: (date: Date) => void;
  },
  HTMLDivElement
>;

type DatePickerCalendarComponent = <TYPE extends DatePickerPropType = 'date'>(
  props: DatePickerCalendarProps<TYPE>,
) => React.ReactElement | null;

const cnDatePickerCalendar = cn('DatePickerCalendar');
const cnDatePickerCalendarCssTransition = cnForCssTransition(cnDatePickerCalendar);

export const DatePickerCalendar: DatePickerCalendarComponent = forwardRef((props, ref) => {
  const {
    form = datePickerPropCalendarFormDefault,
    anchorRef,
    isOpen,
    value,
    className,
    isMobile,
    ...otherProps
  } = props;

  if (isMobile) {
    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        className={cnDatePickerCalendar({ form, isMobile }, [className])}
      >
        <Calendar {...otherProps} value={value || undefined} />
      </Modal>
    );
  }

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      appear
      classNames={cnDatePickerCalendarCssTransition}
      timeout={200}
    >
      <Popover
        ref={ref}
        anchorRef={anchorRef}
        className={cnDatePickerCalendar({ form }, [className])}
        direction="downStartLeft"
        spareDirection="downStartLeft"
        possibleDirections={['downStartLeft', 'upStartLeft', 'downStartRight', 'upStartRight']}
      >
        <Calendar {...otherProps} value={value || undefined} />
      </Popover>
    </CSSTransition>
  );
});
