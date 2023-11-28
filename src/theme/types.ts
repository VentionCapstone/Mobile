import { ReactNode } from 'react';

export interface ThemeColorProps {
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
}

export enum ThemeType {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export interface ThemeContextProps {
  isDark: boolean;
  colors: ThemeColorProps;
  setScheme: (scheme: ThemeType) => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}
