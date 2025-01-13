export type Item = {
  label: string;
  id: string | number;
  groupId?: string | number;
  disabled?: boolean;
  ff?: string;
};

export type Group = {
  label: string;
  id: string | number;
};

export const items: Item[] = [
  {
    label: 'Чёрный',
    groupId: 1,
    id: 1,
    disabled: true,
  },
  {
    label: 'Белый',
    groupId: 1,
    id: 2,
  },
  {
    label: 'Синий',
    groupId: 1,
    id: 3,
  },
  {
    label: 'Красный',
    groupId: 1,
    id: 4,
  },
  {
    label: 'Сине-зелёный',
    groupId: 2,
    id: 5,
  },
  {
    label: 'Красно-коричневый',
    groupId: 2,
    id: 6,
  },
  {
    label: 'Жёлтый',
    groupId: 1,
    id: 7,
  },
  {
    label: 'В полосочку',
    groupId: 3,
    id: 8,
  },
  {
    label: 'В горошек',
    groupId: 3,
    id: 9,
  },
  {
    label: 'Оранжевый',
    groupId: 1,
    id: 10,
  },
  {
    label: 'Серо-бурый',
    groupId: 2,
    id: 11,
  },
  {
    label: 'Сиренево-синий',
    groupId: 2,
    id: 12,
  },
  {
    label: 'Розовый',
    groupId: 1,
    id: 13,
  },
  {
    label: 'В клетку',
    groupId: 3,
    id: 14,
  },
  {
    label: 'Коричневый',
    groupId: 1,
    id: 15,
  },
  {
    label: 'Жёлто-красный',
    groupId: 2,
    id: 16,
  },
];

export const groups: Group[] = [
  {
    id: 1,
    label: 'Первая группа',
  },
  {
    id: 2,
    label: 'Вторая группа',
  },
  {
    id: 3,
    label: 'Третья группа',
  },
];

export type MyItem = {
  name: string;
  group: string;
};

export type MyGroup = string;

export const myGroup: MyGroup[] = [
  'Первая группа',
  'Вторая группа',
  'Третья группа',
];

export const myData: MyItem[] = [
  { name: 'Первый', group: 'Первая группа' },
  { name: 'Второй', group: 'Третья группа' },
  { name: 'Третий', group: 'Вторая группа' },
  { name: 'Четвертый', group: 'Первая группа' },
  { name: 'Пятый', group: 'Первая группа' },
  { name: 'Шестой', group: 'Третья группа' },
  { name: 'Седьмой', group: 'Первая группа' },
  { name: 'Восьмой', group: 'Вторая группа' },
  { name: 'Девятый', group: 'Третья группа' },
  { name: 'Десятый', group: 'Вторая группа' },
];
