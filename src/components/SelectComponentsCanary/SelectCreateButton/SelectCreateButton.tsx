import './SelectCreateButton.css';

import React, { forwardRef } from 'react';

import { FieldPropSize } from '##/components/FieldComponents';
import { ListAddItem } from '##/components/ListCanary';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

type LabelForCreate =
  | ((label: string | undefined) => React.ReactNode)
  | React.ReactNode;

type SelectCreateButtonProps = PropsWithHTMLAttributesAndRef<
  {
    labelForCreate?: LabelForCreate;
    inputValue?: string;
    active: boolean;
    hovered: boolean;
    size: FieldPropSize;
    indent: 'normal' | 'increased';
  },
  HTMLDivElement
>;

const labelForCreateDefault: LabelForCreate = (label) =>
  label ? (
    <span>
      Добавить <b>«{label}»</b>
    </span>
  ) : (
    'Добавить элемент'
  );

export const cnSelectCreateButton = cn('SelectCreateButton');

export const SelectCreateButton: React.FC<SelectCreateButtonProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      labelForCreate = labelForCreateDefault,
      inputValue,
      active,
      hovered,
      size,
      indent,

      ...otherProps
    } = props;

    return (
      <ListAddItem
        {...otherProps}
        ref={ref}
        className={cnSelectCreateButton(null, [className])}
        aria-selected={active}
        role="option"
        active={hovered}
        size={size}
        innerOffset={indent}
        label={
          typeof labelForCreate === 'function'
            ? labelForCreate(inputValue)
            : labelForCreate
        }
        underLine
      />
    );
  },
);
