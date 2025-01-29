import { SelectPropGetItemDisabled } from './types';

export const sortValue = <ITEM>(
  value?: ITEM[] | null,
  getItemDisabled?: SelectPropGetItemDisabled<ITEM>,
) => {
  let i = 0;
  if (!value || value.length <= 1) {
    return value;
  }
  return value.sort((a, b) => {
    console.log(i++);
    if (!getItemDisabled) {
      return 0;
    }
    if (getItemDisabled(a) && getItemDisabled(b)) {
      return 0;
    }
    if (getItemDisabled(a) && !getItemDisabled(b)) {
      return -1;
    }
    if (!getItemDisabled(a) && getItemDisabled(b)) {
      return 1;
    }
    return 0;
  });
};
