import { SignUpParams } from 'src/types';
import { PASSWORD_MIN_LENGTH, isEmailValid, isPasswordMatches, isPasswordValid } from 'src/utils';

const validateForm = (values: SignUpParams): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isEmailValid(values.email)) {
    errors.email = 'Enter valid email';
  }
  if (!isPasswordValid(values.password)) {
    errors.password = `Password must contain at least ${PASSWORD_MIN_LENGTH} characters, numbers, and symbols.`;
  }

  if (!isPasswordMatches(values.password, values.confirm_password)) {
    errors.confirm_password = 'Passwords do not match';
  }

  return errors;
};

export { validateForm };
