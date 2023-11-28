import { ThemeType } from 'src/theme/types';

export interface CountryProps {
  name: string;
}

export interface ProfileFormValues {
  userId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string | undefined;
  description: string;
  photoUrl?: string | undefined;
  country: string | undefined;
  language: string;
  uiTheme: ThemeType;
}

export enum LanguageType {
  English = 'en',
  Russian = 'ru',
  Uzbek = 'uz',
}

export enum GenderType {
  Male = 'MALE',
  Female = 'FEMALE',
}

export enum CountryOptions {
  UZBEKISTAN = 'Uzbekistan',
  KAZAKHSTAN = 'Kazakhstan',
}

export type GenderOptionsProps = {
  label: string;
  value: GenderType;
};
