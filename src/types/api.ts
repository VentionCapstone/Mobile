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
  gender: any;
  country: string;
  language: string;
  uiTheme: any;
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
  Profile: Profile;
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
  id: any;
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
  previewImgUrl: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  availability: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
  ownerId: string;
  address: {
    addressId: string;
    street: string;
    city: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}
