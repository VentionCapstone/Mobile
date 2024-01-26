import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import i18n from 'src/localization/i18n';
import { Language } from 'src/types';

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: Language.English,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const languageReducer = languageSlice.reducer;

export const changeLanguage = (lng: Language) => (dispatch: any) => {
  i18n.changeLanguage(lng);
  dispatch(setLanguage(lng));
};
