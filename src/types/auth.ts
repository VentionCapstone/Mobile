export interface SignInResponse {
  id: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface AuthResponse {
  success: boolean;
  message: number;
}

export interface AuthParams {
  email: string;
}

export interface SignInParams extends AuthParams {
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  confirm_password: string;
}
