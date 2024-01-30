import {
  ACCOUNT_NAME_MAX_LENGTH,
  ACCOUNT_NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
} from './validation.constants';

const isAccountNameValid = (name: string | undefined): boolean => {
  return !!name && name.length >= ACCOUNT_NAME_MIN_LENGTH && name.length <= ACCOUNT_NAME_MAX_LENGTH;
};

const isEmailValid = (email: string): boolean => {
  const lowercasedEmail = email.toLowerCase();
  const emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return emailPattern.test(lowercasedEmail);
};

const isPasswordMatches = (password: string, confirmPassword: string): boolean => {
  return confirmPassword === password;
};

const isPasswordValid = (password: string): boolean => {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return false;
  }
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~/\\/-])/;

  return passwordRegex.test(password);
};

const isPhoneNumberValid = (phoneNumber: string): boolean => {
  const regex = /^\+?[0-9]+$/;
  return regex.test(phoneNumber);
};

export { isEmailValid, isPasswordMatches, isAccountNameValid, isPasswordValid, isPhoneNumberValid };
