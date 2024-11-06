import React from "react";
import { NavLink } from "react-router-dom";

import MobileMenu from "./Menu/MobileMenu";
import DesktopNavList from "./Navigation/DesktopNavList";
import Backdrop from "../Backdrop";

import styles from "./Navbar.module.css";
import { NavbarLogoMobile, NavbarLogoDesktop } from "../../assets/Logos";
import { MenuIcon } from "../../assets/Icons";
import { NavActionsList } from "../../assets/data/navLinksData";

import { RootState } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setIsMenuOpen } from "../../Redux/slices/navbarSlice";

const Navbar: React.FC = () => {
  const { isMenuOpen, isDesktopNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <div className={`${styles.header_logo} align-items-center`}>
          <NavLink to="/">
            <img src={NavbarLogoMobile} alt="logo" />
            <img src={NavbarLogoDesktop} alt="logo" />
          </NavLink>
        </div>

        <div className={`${styles.header_menu}`}>
          <DesktopNavList />

          <button
            className={
              isMenuOpen || isDesktopNewsMenuOpen
                ? "icon_hover active"
                : "icon_hover"
            }
            onClick={() =>
              dispatch(setIsMenuOpen(!(isMenuOpen || isDesktopNewsMenuOpen)))
            }
          >
            <img src={MenuIcon} alt="menu" />
          </button>
        </div>

        <div className={styles.header_actions}>
          <ul>
            {NavActionsList.map((item) => (
              <li key={item.alt} className="icon_hover">
                <div>
                  <NavLink to={item.to} className="align-items-center">
                    <img src={item.icon} alt={item.alt} />
                  </NavLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <MobileMenu />
      <Backdrop />
    </header>
  );
};

export default Navbar;
