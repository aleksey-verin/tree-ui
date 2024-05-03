import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface initialStateTypes {
  isThemeLight: boolean;
}

const initialState = {
  isThemeLight: false
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setThemeLight: (state) => {
      state.isThemeLight = true;
    },
    setThemeDark: (state) => {
      state.isThemeLight = false;
    }
  }
});

export const selectorThemeSlice = (state: RootState) => state.themeSlice;

export default themeSlice.reducer;
