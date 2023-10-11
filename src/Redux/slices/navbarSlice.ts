import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NavbarState } from "../../types/NavbarTypes";

const initialState: NavbarState = {
  isMenuOpen: false,
  isGenresMenuOpen: false,
  isNewsMenuOpen: false,
  isDesktopMenuOpen: false,
  isDesktopNewsMenuOpen: false,
};

export const NavbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setIsMenuOpen: (state, action: PayloadAction<boolean | undefined>) => {
      const payload = action.payload;
      state.isMenuOpen = payload ? payload : !state.isMenuOpen;
    },
    setIsGenreMenuOpen: (state, action: PayloadAction<boolean | undefined>) => {
      const payload = action.payload;
      state.isGenresMenuOpen = payload ? payload : !state.isGenresMenuOpen;
    },
    setIsNewsMenuOpen: (state, action: PayloadAction<boolean | undefined>) => {
      const payload = action.payload;
      state.isNewsMenuOpen = payload ? payload : !state.isNewsMenuOpen;
    },
    setIsDesktopMenuOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      const payload = action.payload;
      state.isDesktopNewsMenuOpen = payload
        ? payload
        : !state.isDesktopMenuOpen;
    },
    setIsDesktopNewsMenuOpen: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      const payload = action.payload;
      state.isDesktopNewsMenuOpen = payload
        ? payload
        : !state.isDesktopNewsMenuOpen;
    },
    resetNavbar: (state) => {
      return initialState;
    },
  },
});

export const {
  setIsMenuOpen,
  setIsGenreMenuOpen,
  setIsNewsMenuOpen,
  setIsDesktopMenuOpen,
  setIsDesktopNewsMenuOpen,
  resetNavbar,
} = NavbarSlice.actions;

export default NavbarSlice.reducer;
