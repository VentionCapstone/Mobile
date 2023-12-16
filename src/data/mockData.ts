import { Gender, Language, ThemeType } from 'src/types';

type User = {
  userId: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  country: string;
  description: string;
  language: Language;
  uiTheme: ThemeType;
};

export const user: User = {
  userId: '1',
  imageUrl: '',
  firstName: 'Testbek',
  lastName: 'Tester',
  phoneNumber: '915552599',
  gender: Gender.Male,
  country: '',
  description: 'lorem',
  language: Language.English,
  uiTheme: ThemeType.Light,
};

export type AccountInfo = {
  label: string;
  value: string;
};

export const accountInfos: AccountInfo[] = [
  {
    label: 'Firstname',
    value: 'John',
  },
  {
    label: 'Lastname',
    value: 'Doe',
  },
  {
    label: 'Phone Number',
    value: '998915552555',
  },
  {
    label: 'Email',
    value: 'j***@gmail.com',
  },
  {
    label: 'Address',
    value: 'No address',
  },
  {
    label: 'Description',
    value: 'lorem',
  },
];
