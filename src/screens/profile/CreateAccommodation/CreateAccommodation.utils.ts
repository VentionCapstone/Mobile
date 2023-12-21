import { CreateAccommodationValues } from 'src/types';

const validateForm = (formValues: CreateAccommodationValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formValues.availableFrom.length) {
    errors.availableFrom = 'Check-in date required';
  }
  if (!formValues.availableTo.length) {
    errors.availableTo = 'Check-out date required';
  }

  if (!formValues.price) {
    errors.price = 'Price required';
  }

  if (!formValues.numberOfRooms) {
    errors.numberOfRooms = 'Room count required';
  }

  if (!formValues.squareMeters) {
    errors.squareMeters = 'Area required';
  }

  return errors;
};

export { validateForm };
