export const defaultLabelForNotFound = 'Не найдено';
export const defaultLabelForCreate = '';
export const defaultLabelForEmptyItems = 'Список пуст';

export const getInputWidth = (
  controlInnerRef: React.RefObject<HTMLDivElement>,
  helperInputFakeElement: React.RefObject<HTMLDivElement>,
): number => {
  if (!controlInnerRef.current || !helperInputFakeElement.current) {
    return 20;
  }
  const fakeElWidth = helperInputFakeElement.current.offsetWidth + 20;
  const maxWidth = controlInnerRef.current
    ? controlInnerRef.current.offsetWidth - 15
    : 2;
  const width = fakeElWidth > maxWidth ? maxWidth : fakeElWidth;
  return width;
};
