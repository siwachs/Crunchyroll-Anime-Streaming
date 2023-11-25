import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../Navbar.module.css";
import { DesktopIconMore } from "../../../assets/Icons";
import { DesktopNavList as DesktopNavListArray } from "../../../assets/data/navLinksData";

import DesktopMenu from "../Menu/DesktopMenu";
import DesktopNewsMenu from "../Menu/DesktopNewsMenu";

import { RootState } from "../../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsMenuOpen,
  setIsDesktopNewsMenuOpen,
  resetNavbar,
} from "../../../Redux/slices/navbarSlice";

const DesktopNavList: React.FC = () => {
  const { isMenuOpen, isDesktopNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();

  const getActiveClass = (index: number): string => {
    if (index === 0) {
      if (isMenuOpen) return "active";
      else return "";
    } else if (index === 3) {
      if (isDesktopNewsMenuOpen) return "active";
      else return "";
    }
    return "";
  };

  return (
    <nav>
      {DesktopNavListArray.map((item, index) =>
        item.isExpandable ? (
          <div key={item.text}>
            <div
              role="button"
              className={`icon_hover align-items-center ${
                styles.desktop_nav_item
              } ${getActiveClass(index)}`}
              onClick={() => {
                if (index === 0) {
                  dispatch(setIsMenuOpen());
                } else if (index === 3) {
                  dispatch(setIsDesktopNewsMenuOpen());
                }
              }}
            >
              <span>{item.text}</span>
              <img
                src={DesktopIconMore}
                alt="more"
                className={styles.expand_icon}
              />
            </div>
            {index === 0 ? <DesktopMenu /> : <DesktopNewsMenu />}
          </div>
        ) : (
          <div
            key={item.text}
            className={`icon_hover align-items-center ${styles.desktop_nav_item}`}
          >
            <NavLink
              to={item.to}
              className="align-items-center"
              onClick={() => dispatch(resetNavbar())}
            >
              <span>{item.text}</span>
            </NavLink>
          </div>
        )
      )}
    </nav>
  );
};

export default DesktopNavList;
