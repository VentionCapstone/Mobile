import { CreateAccommodationValues } from './accommodation';
import { Gender } from './common';
import { ThemeType } from './ui';

export interface CreateProfileParams {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  gender?: Gender;
  description?: string;
  country?: string;
  language?: string;
  photoUrl?: string | undefined;
  uiTheme?: ThemeType;
}

export interface UpdateProfileParams extends CreateProfileParams {
  userId: string;
}

export interface AddressValues {
  street: string;
  city: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
}

export interface CreateAccommodationParams {
  accommodation: CreateAccommodationValues;
  address: AddressValues | undefined;
}

export interface UpdateAccommodationParams extends CreateAccommodationParams {
  accommodationId: string;
}

export interface UploadAccommodationImageParams {
  uri: string;
  type: string;
  name: string;
}

export interface Accommodation {
  accommodation: {
    thumbnailUrl: string;
    previewImgUrl: string;
    squareMeters: number;
    numberOfRooms: number;
    price: number;
    availability: boolean;
    availableFrom: string;
    availableTo: string;
    description: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}
