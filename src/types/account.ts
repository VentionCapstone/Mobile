import { Gender } from './common';
import { ThemeType } from './ui';

export interface Account {
  id: string;
  phoneNumber: string;
  imageUrl: string | undefined;
  gender: Gender;
  country: string;
  uiTheme: ThemeType;
  description?: string;
  language: string;
  userId: string;
}

export interface CreateAccountFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: Gender;
  description: string;
  country: string;
  language: string;
  imageUrl?: string;
  uiTheme: ThemeType;
}

export interface UpdateAccountFormValues extends CreateAccountFormValues {}
