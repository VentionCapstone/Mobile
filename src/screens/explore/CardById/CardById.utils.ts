import { AccommodationFullView } from 'src/types';

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

  const [year, month, day] = inputDate.split('-').map(Number);
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

export const mockValues: AccommodationFullView = {
  id: '123456789',
  thumbnailUrl: 'https://example.com/thumbnail.jpg',
  previewImgUrl: 'https://example.com/preview.jpg',
  squareMeters: 80,
  numberOfRooms: 3,
  price: 1500,
  allowedNumberOfPeople: 4,
  availability: true,
  availableFrom: '2022-01-01',
  availableTo: '2022-01-31',
  description:
    'This is a beautiful accommodation with stunning views on you, lorem ipsum, avada kedavra and dolce gabana with ham',
  address: {
    street: '123 Main Street',
    city: 'Rio de Janeiro',
    country: 'Brazil',
    zipCode: '10001',
    latitude: 40.748817,
    longitude: -73.985428,
  },
  amenities: {
    hasWifi: true,
    hasTv: false,
    hasAirConditioning: true,
    hasKitchen: true,
    hasLaundryService: false,
    hasParking: true,
    hasSmokingAllowance: false,
    hasSwimmingPool: true,
    hasBackyard: false,
    isQuetArea: true,
    isChildFriendly: true,
    hasPetAllowance: false,
    isCloseToCenter: true,
    hasHospitalNearby: true,
    hasAirportTransfer: false,
    otherAmenities: 'Gym, Sauna',
  },
  media: [
    {
      imageUrl: 'https://example.com/image1.jpg',
      thumbnailUrl: 'https://example.com/image1.jpg',
      accommodationId: 'smshtsndkjnfkjdsnfjsnjkdnsnft',
    },
  ],
};
