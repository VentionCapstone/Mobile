import { AccommodationAmenitiesResponse } from './amenities';

export interface CreateAccommodationValues {
  title: string;
  thumbnailUrl?: string;
  previewImgUrl?: string;
  squareMeters: number | null;
  numberOfRooms: number | null;
  allowedNumberOfPeople: number | null;
  price: number | null;
  availableFrom: string;
  availableTo: string;
  timezoneOffset: number;
  description: string;
  address: AddressValues;
}

export interface UpdateAccommodationValues extends CreateAccommodationValues {}

export interface AddressValues {
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
}

export interface AdressListingValues {
  street?: string;
  city?: string;
  country?: string;
}

export type OrderOptions = null | 'asc' | 'desc';

export interface AccommodationListItem {
  id: string;
  price: number;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  isInWishlist: boolean;
  address: AdressListingValues;
  allowedNumberOfPeople: number;
}

export interface Media {
  imageUrl: string;
  thumbnailUrl: string;
  accommodationId: string;
}

export interface AccommodationDetailsParams {
  id: string;
  thumbnailUrl: string;
  previewImgUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  allowedNumberOfPeople: number;
  available: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
  address: AddressValues;
  amenities: AccommodationAmenitiesResponse[];
  media: Media[];
  title: string;
  owner: Owner;
}

interface Owner {
  createdAt: string;
  firstName: string;
  id: string;
  isVerified: boolean;
  lastName: string;
  profile: {
    country: string;
    imageUrl: string;
    language: string;
  };
}

export type AccommodationListPriceRange = {
  currMaxPrice: number;
  curMinPrice: number;
  totalMaxPrice: number;
  totalMinPrice: number;
};

export interface AccommodationsListResponse {
  data: AccommodationListItem[];
  success: boolean;
  priceRange: AccommodationListPriceRange;
  totalCount: number;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface GetAccommodationQueryParams {
  orderByPrice?: SortOrder | null;
  orderByRoom?: SortOrder | null;
  orderByPeople?: SortOrder | null;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  minPeople?: number;
  maxPeople?: number;
  location?: string;
  checkInDate?: string;
  checkOutDate?: string;
  page?: number;
  limit?: number;
}
