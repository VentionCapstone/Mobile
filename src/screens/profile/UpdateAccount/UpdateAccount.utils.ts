import { UpdateAccountFormValues } from 'src/types';
import { ACCOUNT_NAME_MIN_LENGTH, isAccountNameValid, isPhoneNumberValid } from 'src/utils';

const validateForm = (values: UpdateAccountFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isAccountNameValid(values.firstName)) {
    errors.firstName = `First name should be at least ${ACCOUNT_NAME_MIN_LENGTH} characters long`;
  }
  if (!isAccountNameValid(values.lastName)) {
    errors.lastName = `Last name should be at least ${ACCOUNT_NAME_MIN_LENGTH} characters long`;
  }

  if (!isPhoneNumberValid(values.phoneNumber)) {
    errors.phoneNumber = 'Enter valid phone number';
  }

  return errors;
};

export { validateForm };
