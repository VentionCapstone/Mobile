import { CreateAccommodationValues, MyAccommodation } from 'src/types';

export type RootStackParamList = {
  Main: undefined;

  Signin: undefined;
  Signup: undefined;
  VerifyEmail: undefined;

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
  UpdateAccommodation: { accommodation: MyAccommodation };

  CreateAmenities: { accomodationId: string; isNew: boolean };
  UpdateAmenities: { accomodationId: string };

  AccommodationDetails: { accommodationId: string };
  FilterModal: undefined;
  Wishlist: undefined;
  HostProfile: { hostId: string };
};
