export interface SignInResponse {
  id: string;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface SignUpResponse {
  message: string;
  success: boolean;
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
