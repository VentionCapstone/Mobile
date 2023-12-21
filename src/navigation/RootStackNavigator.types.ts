import { StackScreenProps } from '@react-navigation/stack';
import { SignUpParams } from 'src/types';

export type RootStackParamList = {
  Main: undefined;
  Signup?: undefined;
  Signin?: undefined;
  VerifyEmail: { data: SignUpParams };
  Profile?: undefined;
  CreateProfile?: undefined;
  UpdateProfile?: {
    userId: string;
  };
  Account?: undefined;
  ChangeTheme?: undefined;
};

export type Props = StackScreenProps<RootStackParamList, 'VerifyEmail'>;
