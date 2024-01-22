import { AddressValues } from './accommodation';
import { Gender } from './common';
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
  availableFrom: string;
  availableTo: string;
  description: string;
  timezoneOffset: number;
  isDeleted: boolean;
  address: {
    id: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}

export interface Wishlist {
  id: string;
  createdAt: string;
  accommodation: WishlistAccommodationResponse;
}
