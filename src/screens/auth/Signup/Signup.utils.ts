import { SignUpParams } from 'src/types';
import {
  PASSWORD_MIN_LENGTH,
  isEmailNameValid,
  isPasswordMatches,
  isPasswordValid,
} from 'src/utils';

const validateForm = (values: SignUpParams): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isEmailNameValid(values.email)) {
    errors.email = `Please input email adress. Hint: example@email.org`;
  }
  if (!isPasswordValid(values.password)) {
    errors.password = `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`;
  }

  if (!isPasswordMatches(values.password, values.confirm_password)) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
};

export { validateForm };
