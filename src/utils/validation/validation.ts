import {
  ACCOUNT_NAME_MAX_LENGTH,
  ACCOUNT_NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  UZBEK_PHONE_NUMBER_LENGTH,
} from './validation.constants';

const isAccountNameValid = (name: string | undefined): boolean => {
  return !!name && name.length >= ACCOUNT_NAME_MIN_LENGTH && name.length <= ACCOUNT_NAME_MAX_LENGTH;
};

const isEmailNameValid = (email: string): boolean => {
  const pattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};

const isPasswordMatches = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

const isPasswordValid = (password: string | undefined): boolean => {
  return !!password && password.length >= PASSWORD_MIN_LENGTH;
};

const isPhoneNumberValid = (phoneNumber: string): boolean => {
  const regex = new RegExp(`^[0-9]{${UZBEK_PHONE_NUMBER_LENGTH}}$`);
  return regex.test(phoneNumber);
};

export {
  isEmailNameValid,
  isPasswordMatches,
  isAccountNameValid,
  isPasswordValid,
  isPhoneNumberValid,
};
