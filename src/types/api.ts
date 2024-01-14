import { AddressValues, CreateAccommodationValues } from './accommodation';
import { Gender } from './common';
import { ThemeType } from './ui';

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
  lastName: string;
  isVerified: boolean;
  isEmailVerified: boolean;
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
  accommodation: CreateAccommodationValues;
  address: AddressValues;
}

export interface UpdateAccommodationParams extends CreateAccommodationParams {
  accommodationId: string;
}

export interface Accommodation {
  id: string;
  thumbnailUrl: string;
  addressId: string;
  previewImgUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  allowedNumberOfPeople: number;
  availableFrom: string;
  availableTo: string;
  description: string;
  isDeleted: boolean;
  ownerId: string;
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
