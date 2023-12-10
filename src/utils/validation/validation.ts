import {
  ACCOUNT_NAME_MAX_LENGTH,
  ACCOUNT_NAME_MIN_LENGTH,
  PASSWORD_MIN_LENGTH,
  UZBEK_PHONE_NUMBER_LENGTH,
} from './validation.constants';

const isAccountNameValid = (name: string): boolean => {
  return !!name && name.length >= ACCOUNT_NAME_MIN_LENGTH && name.length <= ACCOUNT_NAME_MAX_LENGTH;
};

const isPasswordValid = (password: string): boolean => {
  return !!password && password.length >= PASSWORD_MIN_LENGTH;
};

const isPhoneNumberValid = (phoneNumber: string): boolean => {
  const regex = new RegExp(`^[0-9]{${UZBEK_PHONE_NUMBER_LENGTH}}$`);
  return regex.test(phoneNumber);
};

const isAddressValid = (address: any): boolean => {
  return !!address;
};

const isAvailableFromValid = (checkIn: string): boolean => {
  return !!checkIn;
};

const isAvailableToValid = (checkOut: string): boolean => {
  return !!checkOut;
};

const isPriceValid = (price: number): boolean => {
  return !!price;
};

const isAreaValid = (area: number): boolean => {
  return !!area;
};

const isRoomCountValid = (roomCount: number): boolean => {
  return !!roomCount;
};

export {
  isAccountNameValid,
  isPasswordValid,
  isPhoneNumberValid,
  isAddressValid,
  isAvailableFromValid,
  isAvailableToValid,
  isPriceValid,
  isAreaValid,
  isRoomCountValid,
};
