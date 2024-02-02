import { createSlice } from '@reduxjs/toolkit';
import { Language } from 'src/types';

interface LanguageState {
  language: Language | string;
}

const initialState: LanguageState = {
  language: Language.English,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;
