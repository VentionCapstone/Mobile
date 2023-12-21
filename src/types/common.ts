export enum Country {
  KAZAKHSTAN = 'Kazakhstan',
  RUSSIA = 'Russia',
  UZBEKISTAN = 'Uzbekistan',
}

export type CountryOption = {
  name: Country;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
}

export type GenderOptionsProps = {
  label: string;
  value: Gender;
};

export enum Language {
  English = 'en',
  Russian = 'ru',
  Uzbek = 'uz',
}

export type ThemeColors = {
  background: string;
  border: string;
  borderTint: string;
  buttonBackground: string;
  buttonTextColor: string;
  error: string;
  errorBackground: string;
  icon: string;
  placeholder: string;
  secondaryBackground: string;
  secondaryButtonBackground: string;
  text: string;
  tint: string;
  title: string;
};
