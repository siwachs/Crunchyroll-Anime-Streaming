import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../Navbar.module.css";
import { DesktopIconMore } from "../../../assets/Icons";
import { DesktopNavList as DesktopNavListArray } from "../../../assets/data/mobileNavLinksData";

import { RootState } from "../../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsDesktopMenuOpen,
  setIsNewsMenuOpen,
} from "../../../Redux/slices/navbarSlice";

const DesktopNavList: React.FC = () => {
  const { isDesktopMenuOpen, isDesktopNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();

  const toggleHandler = (index: number): void => {};

  return (
    <nav>
      {DesktopNavListArray.map((item, index) =>
        item.isExpandable ? (
          <div
            role="button"
            key={index}
            className={`icon_hover align-items-center ${styles.desktop_nav_item}`}
            onClick={() => toggleHandler(index)}
          >
            <span>{item.text}</span>
            <img
              src={DesktopIconMore}
              alt="more"
              className={styles.expand_icon}
            />
          </div>
        ) : (
          <div
            key={index}
            className={`icon_hover align-items-center ${styles.desktop_nav_item}`}
          >
            <NavLink to={item.to} className="align-items-center">
              <span>{item.text}</span>
            </NavLink>
          </div>
        )
      )}
    </nav>
  );
};

export default DesktopNavList;
