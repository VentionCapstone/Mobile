export interface SignInParams {
  email: string;
  password: string;
}
export interface SignUpParams {
  email: string;
  password: string;
  confirm_password: string;
}

export interface VerificationParams {
  email: string;
}
