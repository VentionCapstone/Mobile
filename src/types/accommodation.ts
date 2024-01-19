export interface CreateAccommodationValues {
  addressId?: string;
  thumbnailUrl?: string;
  previewImgUrl?: string;
  squareMeters: number | null;
  numberOfRooms: number | null;
  allowedNumberOfPeople: number | null;
  price: number | null;
  availableFrom: string;
  availableTo: string;
  description: string;
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

export interface ListingSearchValues {
  location?: AdressListingValues;
  checkInDate?: string;
  checkOutDate?: string;
  orderByPrice?: OrderOptions;
  orderByRooms?: OrderOptions;
  orderByPeople?: OrderOptions;
  minPrice?: number;
  maxPrice?: number;
  minRooms?: number;
  maxRooms?: number;
  minPeople?: number;
  maxPeople?: number;
  limit?: number;
  page?: number;
}

export interface ExploreListItem {
  id: string;
  thumbnailUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  allowedNumberOfPeople: number;
  price: number;
  address: AdressListingValues;
}
