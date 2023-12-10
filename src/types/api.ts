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

export interface CreateAccommodationparams {
  thumbnailUrl?: string;
  previewImgUrl?: string;
  squareMeters: number;
  numberOfRooms: number;
  price: number;
  availibility: boolean;
  availableFrom: string;
  availableTo: string;
  description: string;
  address: any;
}

export interface UpdateAccommodationparams extends CreateAccommodationparams {
  accommodationId: string;
}
