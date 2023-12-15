import { ErrorResponseType } from './store';

export interface AuthState {
  id: string;
  tokens: Tokens | null;
  pending: boolean;
  error: ErrorResponseType | undefined | null;
}

export interface Tokens {
  access_token: string | null;
  refresh_token: string | null;
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
