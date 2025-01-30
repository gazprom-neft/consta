import { SelectPropGetItemDisabled } from './types';

export const sortValue = <ITEM>(
  value?: ITEM[] | null,
  getItemDisabled?: SelectPropGetItemDisabled<ITEM>,
) => {
  if (!value || value.length <= 1 || !getItemDisabled) {
    return value;
  }
  return value.sort((a, b) => {
    const disabled = [getItemDisabled(a), getItemDisabled(b)] as const;

    if (disabled[0] && disabled[1]) {
      return 0;
    }
    if (disabled[0] && !disabled[1]) {
      return -1;
    }
    if (!disabled[0] && disabled[1]) {
      return 1;
    }
    return 0;
  });
};
