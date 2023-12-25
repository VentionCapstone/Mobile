import { CreateAccountFormValues, Gender } from 'src/types';
import { ACCOUNT_NAME_MIN_LENGTH, isAccountNameValid, isPhoneNumberValid } from 'src/utils';

const validateForm = (values: CreateAccountFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isAccountNameValid(values.firstName)) {
    errors.firstName = `First name should be at least ${ACCOUNT_NAME_MIN_LENGTH} characters long`;
  }
  if (!isAccountNameValid(values.lastName)) {
    errors.lastName = `Last name should be at least ${ACCOUNT_NAME_MIN_LENGTH} characters long`;
  }

  if (!isPhoneNumberValid(values.phoneNumber)) {
    errors.phoneNumber = 'Hint: 90-123-45-67';
  }

  return errors;
};

const genderOptions = [
  { label: 'Male', value: Gender.Male },
  { label: 'Female', value: Gender.Female },
];

export { validateForm, genderOptions };
