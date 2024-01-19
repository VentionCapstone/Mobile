import { Accommodation } from 'src/types';

export type RootStackParamList = {
  Main: undefined;

  Signin: undefined;
  Signup: undefined;
  VerifyEmail: { email: string };

  Account: undefined;
  AddAccommodationImage: { accommodationId: string };
  CreateAccommodation?: { userId: string };
  CreateProfile: undefined;
  ChangeTheme: undefined;
  ChangeLanguage: undefined;
  MyAccommodations: undefined;
  Notifications: undefined;
  NotificationSettings: undefined;
  Profile: undefined;
  UpdateProfile: undefined;
  UpdateAccommodation: { accommodation: Accommodation };

  CreateAmenities: { accomodationId: string; isNew: boolean } | undefined;
  UpdateAmenities: { accomodationId: string };

  CardById: undefined;
};
