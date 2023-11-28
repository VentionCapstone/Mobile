import { ThemeType } from 'src/theme/types';
import { ProfileFormValues, GenderType, LanguageType } from 'src/types';

export const user: ProfileFormValues = {
  photoUrl: '',
  firstName: 'Testbek',
  lastName: 'Tester',
  phoneNumber: '915552599',
  gender: GenderType.Male,
  country: '',
  description: 'lorem',
  language: LanguageType.English,
  uiTheme: ThemeType.Light,
};

export type AccountInfoProps = {
  label: string;
  value: string;
};

export const accountInfos: AccountInfoProps[] = [
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
