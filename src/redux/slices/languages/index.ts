// languageSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LanguageState {
  selectedLanguage: string;
}

export const initialState: LanguageState = {
  selectedLanguage: "en", // Set a default language
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: { language: LanguageState }) =>
  state.language.selectedLanguage;
