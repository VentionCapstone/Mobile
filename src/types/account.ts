import { Gender, Language } from './common';
import { ThemeType } from './ui';

export interface Account {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  email?: string;
  gender?: Gender;
  description?: string;
  country?: string;
  language?: Language;
  photoUrl?: string | undefined;
  uiTheme?: ThemeType;
}

export interface CreateAccountFormValues {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  gender?: Gender;
  description?: string;
  country?: string;
  language?: string;
  photoUrl?: string | undefined;
  uiTheme?: ThemeType;
}

export interface UpdateAccountFormValues extends CreateAccountFormValues {
  userId: string;
}
