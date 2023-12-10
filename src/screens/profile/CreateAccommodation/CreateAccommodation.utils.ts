import { AccommodationFormValues } from 'src/types';
import {
  isAddressValid,
  isAreaValid,
  isAvailableFromValid,
  isAvailableToValid,
  isPriceValid,
  isRoomCountValid,
} from 'src/utils';

const validateForm = (values: AccommodationFormValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isAvailableFromValid(values.availableFrom)) {
    errors.availableFrom = 'Check-in date required';
  }
  if (!isAvailableToValid(values.availableTo)) {
    errors.availableTo = 'Check-out date required';
  }

  if (!isPriceValid(values.price)) {
    errors.price = 'Price required';
  }

  if (!isRoomCountValid(values.numberOfRooms)) {
    errors.numberOfRooms = 'Room count required';
  }

  if (!isAreaValid(values.squareMeters)) {
    errors.squareMeters = 'Area required';
  }

  if (!isAddressValid(values.address)) {
    errors.address = 'Address required';
  }

  return errors;
};

export { validateForm };
