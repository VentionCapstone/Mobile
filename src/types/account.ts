import { Gender, Language } from './common';
import { ErrorResponseType } from './store';
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

export interface AuthState {
  id: string;
  accessToken: string | null;
  refreshToken: string | null;
  pending: boolean;
  error: ErrorResponseType | undefined | null;
}


export interface SignInParams {
  email: string;
  password: string;
}
export interface SignUpParams {
  email: string;
  password: string;
  confirm_password: string;
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
