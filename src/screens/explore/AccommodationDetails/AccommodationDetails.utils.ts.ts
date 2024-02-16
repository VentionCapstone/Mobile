import { IconName } from 'src/types';
import { AccommodationAmenitiesResponse } from 'src/types/amenities';

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

export const AMENITIES_DEFAULT_VALUES = {
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
  otherAmenities: null,
} as const;

export type AmenityChipData = Record<string, AmenityChip>;

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
  isQuiteArea: {
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
} as const;

export type RestAmenities = {
  [key: string]: boolean;
};

export type AmenityChip = {
  text: string;
  icon: IconName;
  iconSet: 'ionicons' | 'material';
};

export function getAmenitiesBadges(amenities: AccommodationAmenitiesResponse): AmenityChip[] {
  const { otherAmenities, id, accommodationId, ...rest } = amenities;
  const amenitiesKeys = Object.keys(rest);

  return amenitiesKeys
    .filter((amenity) => {
      return rest[amenity as keyof typeof rest];
    })
    .map((amenity) => {
      const amenityData = AMENITIES_CHIP_DATA[amenity as keyof typeof AMENITIES_CHIP_DATA];
      if (amenityData) {
        const { text, icon, iconSet } = amenityData;
        return { text, icon, iconSet } as AmenityChip;
      } else {
        return { text: 'Amenity', icon: IconName.Add, iconSet: 'ionicons' };
      }
    });
}

export function getOtherAmenitiesBadges(amenities: AccommodationAmenitiesResponse): AmenityChip[] {
  const separator = ', ';
  return (amenities.otherAmenities?.split(separator) || []).map((amenity) => {
    return { icon: IconName.Add, text: amenity, iconSet: 'ionicons' };
  });
}
