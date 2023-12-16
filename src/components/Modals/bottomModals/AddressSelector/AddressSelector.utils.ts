import * as Location from 'expo-location';
import { Alert } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { AddressValues } from 'src/types';
import { isCityValid, isCountryValid, isStreetValid, isZipCodeValid } from 'src/utils';

const GEOCODER_API_KEY = process.env.EXPO_PUBLIC_GEOCODER_API_KEY ?? '';

Geocoder.init(GEOCODER_API_KEY);

const getCoordinatesByCity = async (city: string) => {
  try {
    if (city) {
      const response = await Geocoder.from(city);
      const { lat, lng } = response.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    }

    return null;
  } catch (error: any) {
    Alert.alert('Error', 'Error getting coordinates by city: ' + error?.message);
    return null;
  }
};

const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return null;
  }

  return await Location.getCurrentPositionAsync({});
};

const getAddressInfo = (
  details: GooglePlaceDetail | null,
  initialLongitude: number,
  initialLatitude: number
) => {
  if (!details) {
    return {
      city: '',
      country: '',
      latitude: initialLatitude,
      longitude: initialLongitude,
    };
  }

  const { address_components, geometry } = details;

  const cityComponent = address_components.find((component) =>
    component.types.includes('locality')
  );
  const countryComponent = address_components.find((component) =>
    component.types.includes('country')
  );

  const city = cityComponent?.long_name || '';
  const country = countryComponent?.long_name || '';

  return {
    city,
    country,
    latitude: geometry.location.lat || initialLatitude,
    longitude: geometry.location.lng || initialLongitude,
  };
};

const validateForm = (addressvalues: AddressValues): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!isCountryValid(addressvalues.country)) {
    errors.country = 'country required';
  }

  if (!isZipCodeValid(addressvalues.zipCode)) {
    errors.zipCode = 'zip code required';
  }

  if (!isCityValid(addressvalues.city)) {
    errors.city = 'city required';
  }

  if (!isStreetValid(addressvalues.street)) {
    errors.street = 'street required';
  }

  return errors;
};

export { getCurrentLocation, getAddressInfo, validateForm, getCoordinatesByCity };
