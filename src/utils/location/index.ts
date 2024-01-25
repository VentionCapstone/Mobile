import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { showAlert } from 'src/components';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY ?? '';

const getAddressInfo = (placeDetails: GooglePlaceDetail | null) => {
  const addressComponents = placeDetails?.address_components || [];
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

  if (placeDetails?.geometry?.location) {
    latitude = placeDetails.geometry.location.lat;
    longitude = placeDetails.geometry.location.lng;
  }

  return { city, country, latitude, longitude };
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
    showAlert('error', { message: `Error fetching places, ${error}` });
    return null;
  }
};

export { getAddressInfo, getPlaceDetails };
