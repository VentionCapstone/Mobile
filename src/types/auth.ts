export interface SignInParams {
  email: string;
  password: string;
}
export interface SignUpParams extends SignInParams {
  confirm_password: string;
}
