import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { AddressValues } from 'src/types';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? '';

type GetAddressInfoProps = {
  placeDetails: GooglePlaceDetail;
};

const getAddressInfo = ({ placeDetails }: GetAddressInfoProps) => {
  const addressComponents = placeDetails.address_components || [];
  let city = '';
  let country = '';
  let latitude = 0;
  let longitude = 0;

  for (const component of addressComponents) {
    if (component.types.includes('locality')) {
      city = component.long_name;
    } else if (component.types.includes('country')) {
      country = component.long_name;
    }
  }

  if (placeDetails.geometry && placeDetails.geometry.location) {
    latitude = placeDetails.geometry.location.lat;
    longitude = placeDetails.geometry.location.lng;
  }

  return { city, country, latitude, longitude };
};

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

const getPlaceDetails = async (placeId: string) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      return data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error fetching places', error);
    return null;
  }
};

const REGION_DELTA = 0.1;

export { getAddressInfo, validateForm, getPlaceDetails, REGION_DELTA, GOOGLE_API_KEY };
