import { SignInParams } from 'src/types';
import { PASSWORD_MIN_LENGTH, isEmailValid, isPasswordValid } from 'src/utils';

const validateForm = (values: SignInParams): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isEmailValid(values.email)) {
    errors.email = 'Enter valid email';
  }
  if (!isPasswordValid(values.password)) {
    errors.password = `Password must contain at least ${PASSWORD_MIN_LENGTH} characters, numbers, and symbols.`;
  }

  return errors;
};

export { validateForm };
