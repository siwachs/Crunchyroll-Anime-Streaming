import React from "react";
import { NavLink } from "react-router-dom";

import DesktopMenu from "./DesktopMenu";

import styles from "../Navbar.module.css";
import {
  BrowseMenu,
  Genres,
  ExtraMenu,
  News,
} from "../../../assets/data/mobileNavLinksData";

// Redux
import { RootState } from "../../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  resetNavbar,
  updateMobileNavbarState,
} from "../../../Redux/slices/navbarSlice";

const Menu: React.FC = () => {
  const { isMenuOpen, isGenresMenuOpen, isNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();

  return (
    <div className={`${styles.menu} ${isMenuOpen ? styles.active : ""}`}>
      <div className={styles.menu_content}>
        <nav>
          <div className={styles.menu_section}>
            <small className={`${styles.menu_header} ${styles.menu_item}`}>
              browse
            </small>
            <ul>
              {BrowseMenu.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.to}>
                    <span>{item.text}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.menu_section}></div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
