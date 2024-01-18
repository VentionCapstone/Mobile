import { Accommodation } from 'src/types';

export type RootStackParamList = {
  Main: undefined;

  Signin: undefined;
  Signup: undefined;
  VerifyEmail: { email: string };

  Account: undefined;
  AccommodationImage: { accommodationId: string };
  AccommodationAddress: any;
  AccommodationInfos: { accommodation: any };
  AccommodationDescription: { accommodation: any };
  AccommodationTitle: { accommodation: any };
  AccommodationPriceAndArea: { accommodation: any };
  AccommodationDate: { accommodation: any };
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
};
