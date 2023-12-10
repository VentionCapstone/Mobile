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
