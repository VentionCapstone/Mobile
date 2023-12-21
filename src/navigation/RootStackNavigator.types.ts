import { Accommodation } from 'src/types';

export type RootStackParamList = {
  Main: undefined;
  Signup?: undefined;
  Signin?: undefined;
  VerifyEmail?: undefined;
  Profile?: undefined;
  CreateProfile?: undefined;
  UpdateProfile?: undefined;
  Account?: undefined;
  ChangeTheme?: undefined;
  MyAccommodations?: undefined;
  CreateAccommodation?: { userId: string };
  UpdateAccommodation?: { accommodation: Accommodation };
  AddAccommodationImage?: any;
};
