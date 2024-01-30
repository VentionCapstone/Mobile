import { AddressValues } from 'src/types';

const validateForm = (addressValues: AddressValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!addressValues.country.length) {
    errors.country = 'country required';
  }

  if (!addressValues.zipCode.length) {
    errors.zipCode = 'zip code required';
  }

  if (!addressValues.city.length) {
    errors.city = 'city required';
  }

  if (!addressValues.street.length) {
    errors.street = 'street required';
  }

  return errors;
};

const REGION_DELTA = 0.1;

export { validateForm, REGION_DELTA };
