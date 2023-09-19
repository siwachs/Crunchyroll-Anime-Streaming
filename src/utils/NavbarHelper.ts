import {
  resetNavbar,
  updateMobileNavbarState,
} from "../Redux/slices/navbarSlice";

import { NavbarState } from "../types/NavbarTypes";

export const toggleMobileMenu = (
  dispatch: any,
  isMenuOpen: boolean,
  key: keyof NavbarState
) => {
  if (isMenuOpen) dispatch(resetNavbar());
  else dispatch(updateMobileNavbarState({ key }));
};
