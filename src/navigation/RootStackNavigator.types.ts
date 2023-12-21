import { StackScreenProps } from '@react-navigation/stack';
import { SignUpParams, Accommodation } from 'src/types';


export type RootStackParamList = {
  Main: undefined;
  Signup?: undefined;
  Signin?: undefined;
  VerifyEmail: { data: SignUpParams };
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

export type Props = StackScreenProps<RootStackParamList, 'VerifyEmail'>;
