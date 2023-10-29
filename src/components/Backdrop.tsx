import React from "react";

// Redux
import { RootState } from "../Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { resetNavbar } from "../Redux/slices/navbarSlice";

const Backdrop: React.FC = () => {
  const { isMenuOpen, isDesktopNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();

  return (
    <div
      role="button"
      onClick={() => dispatch(resetNavbar())}
      className={
        isMenuOpen || isDesktopNewsMenuOpen ? "backdrop active" : "backdrop"
      }
    ></div>
  );
};

export default Backdrop;
