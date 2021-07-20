import { IconProps } from '../../../icons/Icon/Icon';
import { DateRange } from '../../../utils/types/Date';
import { TextFieldPropForm } from '../../TextField/TextField';
import { DatePickerDateFieldProps } from '../DatePickerDateField/helpers';

type DatePickerDateRangeFieldPropOnChange = (props: { e: Event; value: DateRange | null }) => void;

export type DatePickerDateRangeFieldProps = Omit<
  DatePickerDateFieldProps,
  'onChange' | 'value' | 'inputRef' | 'leftSide' | 'rightSide' | 'id' | 'onFocus' | 'onBlur'
> & {
  onChange?: DatePickerDateRangeFieldPropOnChange;
  value?: DateRange | null;
  startFieldInputRef?: React.Ref<HTMLInputElement>;
  endFieldInputRef?: React.Ref<HTMLInputElement>;
  startFieldLeftSide?: string | React.FC<IconProps>;
  startFieldRightSide?: string | React.FC<IconProps>;
  endFieldLeftSide?: string | React.FC<IconProps>;
  endFieldRightSide?: string | React.FC<IconProps>;
  startFieldRef?: React.Ref<HTMLDivElement>;
  endFieldRef?: React.Ref<HTMLDivElement>;
  startFieldOnFocus?: React.FocusEventHandler<HTMLElement>;
  endFieldOnFocus?: React.FocusEventHandler<HTMLElement>;
  startFieldOnBlur?: React.FocusEventHandler<HTMLElement>;
  endFieldOnBlur?: React.FocusEventHandler<HTMLElement>;
  id?: string;
};

export const mapFormForStart: Record<TextFieldPropForm, TextFieldPropForm> = {
  default: 'defaultClear',
  defaultClear: 'defaultClear',
  defaultBrick: 'defaultClear',
  brick: 'brickClear',
  brickDefault: 'brickClear',
  brickClear: 'brickClear',
  brickRound: 'brickClear',
  round: 'roundClear',
  roundClear: 'roundClear',
  roundBrick: 'roundClear',
  clearRound: 'clearClear',
  clearDefault: 'clearClear',
  clearBrick: 'clearClear',
  clearClear: 'clearClear',
};

export const mapFormForEnd: Record<TextFieldPropForm, TextFieldPropForm> = {
  default: 'brickDefault',
  defaultClear: 'brickClear',
  defaultBrick: 'brick',
  brick: 'brick',
  brickDefault: 'brickDefault',
  brickClear: 'brickClear',
  brickRound: 'brickRound',
  round: 'brickRound',
  roundClear: 'brickClear',
  roundBrick: 'brick',
  clearRound: 'brickRound',
  clearDefault: 'brickDefault',
  clearBrick: 'brick',
  clearClear: 'brickClear',
};
