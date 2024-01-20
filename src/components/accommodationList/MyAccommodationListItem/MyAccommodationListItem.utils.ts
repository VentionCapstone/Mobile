import { AddressValues } from 'src/types';

const getLocationName = (address: AddressValues) => {
  const combinedLocationText = `${address?.city}, ${address?.country}`;

  return address?.city.length + address?.country.length <= 40
    ? `${address?.city}, ${address?.country}`
    : `${combinedLocationText.substring(0, 24)}...`;
};

export { getLocationName };
