import { createSlice } from '@reduxjs/toolkit';
import { darkColors, lightColors } from 'src/styles';
import { ThemeColors } from 'src/types';

type ThemeStateType = {
  isDark: boolean;
  colors: ThemeColors;
};

const initialState: ThemeStateType = {
  isDark: false,
  colors: lightColors,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.isDark = action.payload === 'dark';
      state.colors = action.payload === 'dark' ? darkColors : lightColors;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;
