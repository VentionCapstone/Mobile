import { AddressValues } from './accommodation';
import { AccommodationAmenitiesResponse, Amenities } from './amenities';
import { Gender, Language } from './common';
import { ThemeType } from './ui';
import { WishlistAccommodationResponse } from './wishlist';

export interface ApiErrorResponseType {
  success: boolean;
  error: {
    error?: string;
    message: string | string[];
    statusCode?: number;
  };
}

export interface ApiSuccessResponseType<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface Profile {
  id: string;
  phoneNumber: string;
  imageUrl: string;
  gender: Gender;
  country: string;
  language: string;
  uiTheme: ThemeType;
  description: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  role: string;
  lastName: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  actiovationLink: string;
  profile: Profile | null;
}

export interface ProfileResponseType {
  id: string;
  phoneNumber: string;
  gender: string;
  description: string;
  country: string;
  language: string;
  imageUrl?: string;
  uiTheme: string;
}

export interface CreateProfileParams {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: Gender;
  description?: string;
  country?: string;
  language?: string;
  imageUrl?: string | undefined;
  uiTheme?: ThemeType;
}

export interface UpdateProfileParams {
  id: string | undefined;
  formValues: CreateProfileParams;
}

export interface CreateAccommodationParams {
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

export interface UpdateAccommodationParams {
  accommodationId: string;
  accommodation: CreateAccommodationParams;
}

export interface AccommodationMedia {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  accommodationId: string;
}

export interface AccommodationAddressResponse {
  id: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface AccommodationOwner {
  id: string;
  ownerId: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  profile: {
    language: Language;
    imageUrl: string;
    country: string;
  };
}

export interface Accommodation {
  id: string;
  title: string;
  thumbnailUrl: string;
  previewImgUrl: string;
  addressId: string;
  ownerId: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  allowedNumberOfPeople: number;
  available: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
  timezoneOffset: number;
  isDeleted: boolean;
  isInWishlist: boolean;
  address: AccommodationAddressResponse;
  media?: AccommodationMedia[];
  amenities?: AccommodationAmenitiesResponse;
  owner: AccommodationOwner;
}

export interface MyAccommodation {
  id: string;
  title: string;
  addressId: string;
  thumbnailUrl: string;
  previewImgUrl: string;
  ownerId: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  allowedNumberOfPeople: number;
  available: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
  timezoneOffset: number;
  isDeleted: boolean;
  address: AccommodationAddressResponse;
  isInWishlist: boolean;
  media?: AccommodationMedia[];
  amenities?: Amenities;
}

export interface Wishlist {
  id: string;
  createdAt: string;
  accommodation: WishlistAccommodationResponse;
}

export interface HostProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  language: string;
  country: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  rating: string | null;
  accommodations: HostAccommodation[] | null;
  reviews: {
    count: number;
    page: number;
    list: HostReviews[] | null;
  };
}

export interface HostAccommodation {
  id: string;
  title: string;
  previewImgUrl: string;
  rating: number;
}

export interface HostReviews {
  id: string;
  accommodationId: string;
  feedback: string;
  rating: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profile: {
      imageUrl: string;
    };
  };
}
