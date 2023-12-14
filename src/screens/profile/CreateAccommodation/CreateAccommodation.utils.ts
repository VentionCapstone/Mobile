import { CreateAccommodationValues } from 'src/types';
import {
  isAreaValid,
  isAvailableFromValid,
  isAvailableToValid,
  isPriceValid,
  isRoomCountValid,
} from 'src/utils';

const validateForm = (formValues: CreateAccommodationValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isAvailableFromValid(formValues.availableFrom)) {
    errors.availableFrom = 'Check-in date required';
  }
  if (!isAvailableToValid(formValues.availableTo)) {
    errors.availableTo = 'Check-out date required';
  }

  if (!isPriceValid(formValues.price)) {
    errors.price = 'Price required';
  }

  if (!isRoomCountValid(formValues.numberOfRooms)) {
    errors.numberOfRooms = 'Room count required';
  }

  if (!isAreaValid(formValues.squareMeters)) {
    errors.squareMeters = 'Area required';
  }

  return errors;
};

export { validateForm };
