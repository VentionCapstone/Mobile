import { AccommodationFullView, IconName, IconSet } from 'src/types';

export function formatDate(inputDate: string, includeOrdinal: boolean = true): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [year, month, day] = inputDate.split('T')[0].split('-').map(Number);
  const monthName = months[month - 1];

  const dayWithOrdinal = includeOrdinal ? addOrdinalSuffix(day) : day.toString();

  return `${monthName} ${dayWithOrdinal}, ${year}`;
}

function addOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }

  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export const DEFAULT_ACCOMMODATION_VIEW: AccommodationFullView = {
  id: '',
  title: '',
  thumbnailUrl: '',
  previewImgUrl: '',
  squareMeters: 0,
  numberOfRooms: 0,
  price: 0,
  allowedNumberOfPeople: 0,
  available: false,
  availableFrom: '',
  availableTo: '',
  description: '',
  address: {
    street: '',
    city: '',
    country: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
  },
  amenities: [
    {
      id: '',
      accommodationId: '',
      hasWifi: false,
      hasTv: false,
      hasAirConditioning: false,
      hasKitchen: false,
      hasLaundryService: false,
      hasParking: false,
      hasSmokingAllowance: false,
      hasSwimmingPool: false,
      hasBackyard: false,
      isQuetArea: false,
      isChildFriendly: false,
      hasPetAllowance: false,
      isCloseToCenter: false,
      hasHospitalNearby: false,
      hasAirportTransfer: false,
      otherAmenities: '',
    },
  ],
  media: [
    {
      imageUrl: '',
      thumbnailUrl: '',
      accommodationId: '',
    },
  ],
} as const;

export const AMENITIES_CHIP_DATA = {
  hasWifi: {
    text: 'Has Wi-Fi',
    icon: IconName.Wifi,
    iconSet: 'ionicons',
  },
  hasTv: {
    text: 'Has TV',
    icon: IconName.Tv,
    iconSet: 'ionicons',
  },
  hasAirConditioning: {
    text: 'Has air conditioning',
    icon: IconName.Snow,
    iconSet: 'ionicons',
  },
  hasKitchen: {
    text: 'Has kitchen',
    icon: IconName.Kitchen,
    iconSet: 'material',
  },
  hasLaundryService: {
    text: 'Has laundry service',
    icon: IconName.Shirt,
    iconSet: 'ionicons',
  },
  hasParking: {
    text: 'Has parking',
    icon: IconName.Parking,
    iconSet: 'ionicons',
  },
  hasSmokingAllowance: {
    text: 'Has smoking allowance',
    icon: IconName.Smoking,
    iconSet: 'material',
  },
  hasSwimmingPool: {
    text: 'Has swimming pool',
    icon: IconName.Pool,
    iconSet: 'material',
  },
  hasBackyard: {
    text: 'Has backyard',
    icon: IconName.Home,
    iconSet: 'ionicons',
  },
  isQuetArea: {
    text: 'Is quet area',
    icon: IconName.Moon,
    iconSet: 'ionicons',
  },
  isChildFriendly: {
    text: 'Is child friendly',
    icon: IconName.Child,
    iconSet: 'material',
  },
  hasPetAllowance: {
    text: 'Has pet allowance',
    icon: IconName.Paw,
    iconSet: 'ionicons',
  },
  isCloseToCenter: {
    text: 'Is close to center',
    icon: IconName.Pin,
    iconSet: 'ionicons',
  },
  hasHospitalNearby: {
    text: 'Has hospital nearby',
    icon: IconName.Med,
    iconSet: 'ionicons',
  },
  hasAirportTransfer: {
    text: 'Has airport transfer',
    icon: IconName.Airplane,
    iconSet: 'ionicons',
  },
};
