import { Accommodation, CreateAccommodationValues } from 'src/types';

export type RootStackParamList = {
  Main: undefined;

  Signin: undefined;
  Signup: undefined;
  VerifyEmail: { email: string };

  Account: undefined;
  AccommodationImage: { accommodationId: string };
  AccommodationAddress: undefined;
  AccommodationInfos: { accommodation: Partial<CreateAccommodationValues> };
  AccommodationDescription: { accommodation: Partial<CreateAccommodationValues> };
  AccommodationTitle: { accommodation: Partial<CreateAccommodationValues> };
  AccommodationPriceAndArea: { accommodation: Partial<CreateAccommodationValues> };
  AccommodationDate: { accommodation: any };
  CreateProfile: undefined;
  ChangeTheme: undefined;
  ChangeLanguage: undefined;
  MyAccommodations: undefined;
  Notifications: undefined;
  NotificationSettings: undefined;
  Profile: undefined;
  ProfileImage: undefined;
  UpdateProfile: undefined;
  UpdateAccommodation: { accommodation: Accommodation };

  CreateAmenities: { accomodationId: string; isNew: boolean };
  UpdateAmenities: { accomodationId: string };

  AccommodationDetails: { accomodationId: string };
  FilterModal: undefined;
};
