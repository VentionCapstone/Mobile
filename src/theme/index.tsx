import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, createContext } from 'react';
import { useColorScheme, Alert, StatusBar } from 'react-native';
import { darkColors, lightColors } from 'src/styles/theme';

import { ThemeContextProps, ThemeProviderProps, ThemeType } from './types';

export const ThemeContext = createContext<ThemeContextProps>({
  isDark: false,
  colors: lightColors,
  setScheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState<boolean>(colorScheme === ThemeType.Dark);

  useEffect(() => {
    const retrieveThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        setIsDark(storedTheme === ThemeType.Dark || colorScheme === ThemeType.Dark);
        StatusBar.setBarStyle(storedTheme === ThemeType.Dark ? 'light-content' : 'dark-content');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Failed to load theme');
      }
    };

    retrieveThemeFromStorage();
  }, [colorScheme]);

  const defaultTheme: ThemeContextProps = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    setScheme: (scheme: ThemeType) => setIsDark(scheme === ThemeType.Dark),
  };

  return <ThemeContext.Provider value={defaultTheme}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => React.useContext(ThemeContext);
