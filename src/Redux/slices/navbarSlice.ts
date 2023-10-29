import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NavbarState } from "../../types/NavbarTypes";

const initialState: NavbarState = {
  isMenuOpen: false,
  isGenresMenuOpen: false,
  isNewsMenuOpen: false,
  isDesktopNewsMenuOpen: false,
};

export const NavbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean | undefined>) => {
      if (state.isDesktopNewsMenuOpen) {
        state.isDesktopNewsMenuOpen = false;
      }
      const payload = action.payload;
      state.isMenuOpen = payload ?? !state.isMenuOpen;
    },
    setIsGenreMenuOpen: (state, action: PayloadAction<boolean | undefined>) => {
      const payload = action.payload;
      state.isGenresMenuOpen = payload ?? !state.isGenresMenuOpen;
    },
    setIsNewsMenuOpen: (state, action: PayloadAction<boolean | undefined>) => {
      const payload = action.payload;
      state.isNewsMenuOpen = payload ?? !state.isNewsMenuOpen;
    },
    setIsDesktopNewsMenuOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (state.isMenuOpen) {
        state.isMenuOpen = false;
      }
      const payload = action.payload;
      state.isDesktopNewsMenuOpen = payload ?? !state.isDesktopNewsMenuOpen;
    },
    resetNavbar: () => {
      return initialState;
    },
  },
});

export const {
  setIsMenuOpen,
  setIsGenreMenuOpen,
  setIsNewsMenuOpen,
  setIsDesktopNewsMenuOpen,
  resetNavbar,
} = NavbarSlice.actions;

export default NavbarSlice.reducer;
