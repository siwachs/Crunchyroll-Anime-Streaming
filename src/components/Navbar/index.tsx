import React from "react";
import { NavLink } from "react-router-dom";

import Menu from "./Menu/Menu";
import NavList from "./Navigation/NavList";
import Backdrop from "../Backdrop";

import styles from "./Navbar.module.css";
import { NavbarLogoMobile, NavbarLogoDesktop } from "../../assets/Logos";
import { MenuIcon } from "../../assets/Icons";
import { NavActionsList } from "../../assets/data/mobileNavLinksData";

// Redux
import { RootState } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";

// Utils
import { toggleMobileMenu } from "../../utils/NavbarHelper";

const Navbar: React.FC = () => {
  const { isMenuOpen, isDesktopMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={`${styles.header_logo} h-center`}>
          <NavLink to="/">
            <img src={NavbarLogoMobile} alt="logo" />
            <img src={NavbarLogoDesktop} alt="logo" />
          </NavLink>
        </div>

        <div className={`${styles.header_menu}`}>
          <NavList />

          <button
            className={`${
              isMenuOpen || isDesktopMenuOpen
                ? "hover_icon active"
                : "hover_icon"
            }`}
            onClick={() => toggleMobileMenu(dispatch, isMenuOpen, "isMenuOpen")}
          >
            <img src={MenuIcon} alt="menu" />
          </button>
        </div>

        <div className={styles.header_actions}>
          <ul>
            {NavActionsList.map((item, index) => (
              <li key={index} className="hover_icon">
                <div>
                  <NavLink to={item.to}>
                    <img src={item.icon} alt={item.alt} />
                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Menu />
      <Backdrop />
    </header>
  );
};

export default Navbar;
