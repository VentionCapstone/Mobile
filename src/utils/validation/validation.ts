import {
  ACCOUNT_NAME_MAX_LENGTH,
  ACCOUNT_NAME_MIN_LENGTH,
  ADDRESS_INFO_MAX_LENGTH,
  ADDRESS_ZIPCODE_MAX_LENGTH,
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

const isAvailableFromValid = (checkIn: string): boolean => {
  return !!checkIn;
};

const isAvailableToValid = (checkOut: string): boolean => {
  return !!checkOut;
};

const isPriceValid = (price: number | null): boolean => {
  return !!price;
};

const isAreaValid = (area: number | null): boolean => {
  return !!area;
};

const isRoomCountValid = (roomCount: number | null): boolean => {
  return !!roomCount;
};

const isCountryValid = (city: string): boolean => {
  return !!city;
};

const isCityValid = (city: string): boolean => {
  return !!city;
};

const isStreetValid = (street: string): boolean => {
  return !!street;
};

const isSteetValid = (street: string): boolean => {
  return !!street;
};

const isZipCodeValid = (zipCode: string): boolean => {
  return !!zipCode;
};

export {
  isAccountNameValid,
  isPasswordValid,
  isPhoneNumberValid,
  isSteetValid,
  isAvailableFromValid,
  isAvailableToValid,
  isPriceValid,
  isAreaValid,
  isRoomCountValid,
  isCountryValid,
  isCityValid,
  isStreetValid,
  isZipCodeValid,
};
