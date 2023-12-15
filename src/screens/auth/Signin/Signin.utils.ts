import { SignInParams } from 'src/types';
import { isEmailNameValid, isPasswordValid } from 'src/utils';

const validateForm = (values: SignInParams): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isEmailNameValid(values.email)) {
    errors.email = `Please input email adress. Hint: example@email.org`;
  }
  return errors;
};

export { validateForm };
