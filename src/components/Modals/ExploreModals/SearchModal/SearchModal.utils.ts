import showAlert from "src/components/alert";
import { GOOGLE_API_KEY } from "../../bottomModals/AddressSelector/AddressSelector.utils";

export type SelectedCards = {
  [key: string]: boolean;
};

type CollapsableCardsMap = {
  allClosed: SelectedCards;
  locationPressed: SelectedCards;
  checkInPressed: SelectedCards;
  checkOutPressed: SelectedCards;
};

export const COLLAPSABLE_CARDS_POSITIONS: CollapsableCardsMap = {
  allClosed: {
    location: true,
    checkin: true,
    checkout: true,
  },
  locationPressed: {
    location: false,
    checkin: true,
    checkout: true,
  },
  checkInPressed: {
    location: true,
    checkin: false,
    checkout: true,
  },
  checkOutPressed: {
    location: true,
    checkin: true,
    checkout: false,
  },
} as const;

export const getPlaceDetails = async (placeId: string) => {
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

export const getNextDay = (dateString: string) => {
  const date = new Date(dateString.replaceAll("/", "-"))
  const nextDate = new Date(date.setDate(date.getDate() + 1))

  let year = nextDate.getFullYear() 
  let month = String(nextDate.getMonth() + 1) 
  let day = String(nextDate.getDate()) 

  month = month.length == 1 ?  
      month.padStart(2, '0') : month; 

  day = day.length == 1 ?  
      day.padStart(2, '0') : day; 

  const nextDayString = `${year}/${month}/${day}`
  return nextDayString;
}

export const formatLocationString = (locationString: string) => {
  const parts: Array<string> = locationString.split(',').map((part) => part.trim());
  const city = parts[0];
  const country = parts[parts.length - 1];

  const formattedLocationString = `${city}, ${country}`;
  return formattedLocationString;
};

export const isInvalidDateRange = (checkin: string, checkout: string) => {
  if (checkin === '' && checkout === '') return false;
  const today = new Date().setHours(0, 0, 0, 0);;
  const checkInTime = new Date(checkin.replace(/\//g, '-')).setHours(0, 0, 0, 0);
  const checkOutTime = new Date(checkout.replace(/\//g, '-')).setHours(0, 0, 0, 0);
  return (
    (checkin === '' || checkout === '') || 
    (checkInTime > checkOutTime) || 
    (checkInTime === checkOutTime) || 
    (checkInTime < today) ||
    (checkOutTime <= today)
  )
}
