import React, { useEffect, useRef, useState } from 'react';
import { format, isValid, isWithinInterval, parse } from 'date-fns';
import IMask from 'imask';

import { useForkRef } from '../../../hooks/useForkRef/useForkRef';
import { leapYear, maxDateDefault, minDateDefault } from '../../../utils/date';
import { TextField } from '../../TextField/TextField';
import {
  datePickerErrorTypes,
  datePickerPropFormatDefault,
  datePickerPropPlaceholderDefault,
  datePickerPropSeparatorDefault,
} from '../helpers';

import { DatePickerDateFieldProps, getPartsDate } from './helpers';

export const DatePickerDateField = React.forwardRef<HTMLDivElement, DatePickerDateFieldProps>(
  (props, ref) => {
    const {
      format: formatProp = datePickerPropFormatDefault,
      separator = datePickerPropSeparatorDefault,
      placeholder = datePickerPropPlaceholderDefault,
      onChange,
      onError,
      minDate = minDateDefault,
      maxDate = maxDateDefault,
      value,
      inputRef: inputRefProp,
      ...otherProps
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const imaskRef = useRef<IMask.InputMask<IMask.MaskedDateOptions> | null>(null);

    const [stringValue, setStringValue] = useState<string | null>(
      value && isValid(value) ? format(value, formatProp) : null,
    );

    const handleChange = (e: Event, stringValue: string | null) => {
      setStringValue(stringValue);

      if (onChange) {
        if (!stringValue) {
          onChange({ e, value: null });
          return;
        }

        const [dd, MM, yyyy] = getPartsDate(stringValue, formatProp, separator);

        if (dd && MM && yyyy) {
          const date = parse(
            `${dd}${datePickerPropSeparatorDefault}${MM}${datePickerPropSeparatorDefault}${yyyy}`,
            datePickerPropFormatDefault,
            new Date(),
          );
          if (!isWithinInterval(date, { start: minDate, end: maxDate })) {
            onError &&
              onError({
                type: datePickerErrorTypes[0],
                stringValue,
                dd,
                MM,
                yyyy,
                date,
              });

            onChange({ e, value: null });
            return;
          }
          onChange({ e, value: date });
        } else {
          onChange({ e, value: null });
        }
      }
    };

    // при изменении value, нужно оюновить stringValue
    useEffect(() => {
      if (value && isValid(value)) {
        setStringValue(format(value, formatProp));
      } else if (stringValue?.length === formatProp.length) {
        // если количество введенных символов меньше чем в формате маски
        // то не нужно мешать вводу с клавиатуры
        // если дата была введена полностью и value пришел null,
        // то можно считать что поле нуждается в очистке
        setStringValue('');
      }
    }, [value?.getTime()]);

    // задаем маску и сохраняем обьект маски в ref
    // обнавляем при смене формата
    useEffect(() => {
      if (inputRef.current) {
        imaskRef.current = (IMask(inputRef.current, {
          mask: Date,
          pattern: formatProp,
          blocks: {
            yyyy: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 9999,
            },
            MM: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 12,
            },
            dd: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 31,
            },
          },
          lazy: true,
          autofix: true,
          format: (date) => format(date, formatProp),
          parse: (string) => parse(string, formatProp, new Date()),
          validate: (string: string) => {
            const [dd, MM, yyyy] = getPartsDate(string, formatProp, separator);

            if (
              dd &&
              MM &&
              !isValid(
                parse(
                  `${dd}${datePickerPropSeparatorDefault}${MM}${datePickerPropSeparatorDefault}${leapYear}`,
                  datePickerPropFormatDefault,
                  new Date(),
                ),
              )
            ) {
              onError &&
                onError({
                  type: datePickerErrorTypes[1],
                  stringValue: string,
                  dd,
                  MM,
                  yyyy,
                });

              return false;
            }

            if (
              dd &&
              MM &&
              yyyy &&
              !isValid(
                parse(
                  `${dd}${datePickerPropSeparatorDefault}${MM}${datePickerPropSeparatorDefault}${yyyy}`,
                  datePickerPropFormatDefault,
                  new Date(),
                ),
              )
            ) {
              onError &&
                onError({
                  type: datePickerErrorTypes[1],
                  stringValue: string,
                  dd,
                  MM,
                  yyyy,
                });

              return false;
            }

            return true;
          },
          // проблема в типах IMask
        }) as unknown) as IMask.InputMask<IMask.MaskedDateOptions>;
      }
    }, [formatProp, separator]);

    // задаем нативный oninput, так как с маской по другому не будет работать
    // обнавляем oninput при смене onChange
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.oninput = (e) => {
          handleChange(e, inputRef.current?.value || '');
        };
      }
    }, [onChange]);

    // Нужно для синхранизации value c value в Imask,
    // так как value мы можем задать через пропс без самого ввода,
    // и Imask требует ручной синхронихации в этом случае
    useEffect(() => {
      imaskRef.current?.updateValue();
    }, [stringValue]);

    return (
      <TextField
        {...otherProps}
        type="text"
        ref={ref}
        inputRef={useForkRef([inputRef, inputRefProp])}
        value={stringValue}
        placeholder={placeholder}
      />
    );
  },
);
