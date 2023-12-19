export type RootStackParamList = {
  Main: undefined;
  Signup?: undefined;
  Signin?: undefined;
  VerifyEmail?: { email: string };
  Profile?: undefined;
  CreateProfile?: undefined;
  UpdateProfile?: {
    userId: string;
  };
  Account?: undefined;
  ChangeTheme?: undefined;
};
