export enum Language {
  English = 'en',
  Russian = 'ru',
  Uzbek = 'uz',
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}

export enum Country {
  UZBEKISTAN = 'Uzbekistan',
  KAZAKHSTAN = 'Kazakhstan',
}

export type CountryOption = {
  name: Country;
};

export type GenderOptionsProps = {
  label: string;
  value: Gender;
};

export type ThemeColors = {
  background: string;
  secondaryBackground: string;
  icon: string;
  text: string;
  tint: string;
  border: string;
  borderTint: string;
  error: string;
  placeholder: string;
  buttonBackground: string;
  secondaryButtonBackground: string;
  buttonTextColor: string;
  errorBackground: string;
};
