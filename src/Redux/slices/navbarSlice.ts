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
    updateNavbar: (
      state,
      action: PayloadAction<{ key: keyof NavbarState }>
    ) => {
      const { key } = action.payload;
    },
    updateMobileNavbarState: (
      state,
      action: PayloadAction<{
        key: keyof NavbarState;
      }>
    ) => {
      const { key } = action.payload;
      state[key] = !state[key];
    },
    updateDesktopNavbarState: (
      state,
      action: PayloadAction<{
        key: keyof NavbarState;
      }>
    ) => {
      const { key } = action.payload;
      if (key === "isDesktopMenuOpen") {
        if (state.isDesktopNewsMenuOpen) state.isDesktopNewsMenuOpen = false;
      } else if (key === "isDesktopNewsMenuOpen") {
        if (state.isDesktopMenuOpen) state.isDesktopMenuOpen = false;
      }

      state[key] = !state[key];
    },
    resetNavbar: (state) => {
      return initialState;
    },
  },
});

export const {
  updateMobileNavbarState,
  updateDesktopNavbarState,
  resetNavbar,
} = NavbarSlice.actions;

export default NavbarSlice.reducer;
