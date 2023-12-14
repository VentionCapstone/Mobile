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

export interface AccommodationValues {
  thumbnailUrl?: string;
  previewImgUrl?: string;
  squareMeters: number | null;
  numberOfRooms: number | null;
  price: number | null;
  availability: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
}

export interface CreateAccommodationParams {
  accommodation: AccommodationValues;
  address: AddressValues;
}

export interface UpdateAccommodationParams extends CreateAccommodationParams {
  accommodationId: string;
}
