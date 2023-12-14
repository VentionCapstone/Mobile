import * as Location from 'expo-location';
import { Alert } from 'react-native';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { AddressValues } from 'src/types';

const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
    return null;
  }

  return await Location.getCurrentPositionAsync({});
};

const handlePlaceSelected = (
  data: GooglePlaceData,
  details: GooglePlaceDetail | null,
  setAddressValues: (values: AddressValues) => void,
  onSelect: (values: AddressValues) => void
) => {
  if (details) {
    const { address_components, geometry } = details;

    const city =
      address_components.find((component) => component.types.includes('locality'))?.long_name || '';
    const street =
      address_components.find((component) => component.types.includes('route'))?.long_name || '';
    const zipCode =
      address_components.find((component) => component.types.includes('postal_code'))?.long_name ||
      '';
    const country =
      address_components.find((component) => component.types.includes('country'))?.long_name || '';

    const addressValues: AddressValues = {
      country,
      city,
      street,
      zipCode,
      longitude: geometry.location.lng,
      latitude: geometry.location.lat,
    };

    setAddressValues(addressValues);
    onSelect(addressValues);
  }
};

export { getCurrentLocation, handlePlaceSelected };
