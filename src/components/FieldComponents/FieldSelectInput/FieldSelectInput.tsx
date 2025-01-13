import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { isString } from '##/utils/type-guards';
import { PropsWithJsxAttributes } from '##/utils/types/PropsWithJsxAttributes';

import { FieldInput } from '../FieldInput';
import { cnFieldSelectInput } from './cnFieldSelectInput';

type FieldInputProps = PropsWithJsxAttributes<
  {
    children?: React.ReactNode;
  },
  'input'
>;

export const FieldSelectInput = forwardRef<HTMLInputElement, FieldInputProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cnFieldSelectInput({ withValue: !!children }, [className])}
      >
        {children && (
          <div className={cnFieldSelectInput('Value')}>
            {isString(children) ? (
              <Text truncate className={cnFieldSelectInput('ValueText')}>
                {children}
              </Text>
            ) : (
              children
            )}
          </div>
        )}
        <FieldInput
          className={cnFieldSelectInput('Input')}
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);
