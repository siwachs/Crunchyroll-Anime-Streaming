import React from "react";

import MobileNavList from "../Navigation/MobileNavList";

import styles from "../Navbar.module.css";
import {
  BrowseMenu,
  Genres,
  ExtraMenu,
  News,
} from "../../../assets/data/mobileNavLinksData";

import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";
import {
  setIsGenreMenuOpen,
  setIsNewsMenuOpen,
} from "../../../Redux/slices/navbarSlice";

const MobileMenu: React.FC = () => {
  const { isMenuOpen, isGenresMenuOpen, isNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );

  return (
    <div
      className={isMenuOpen ? `${styles.menu} ${styles.active}` : styles.menu}
    >
      <div className={styles.menu_content}>
        <nav>
          <div className={styles.menu_section}>
            <small className={styles.menu_header}>browse</small>
            <MobileNavList
              title="genres"
              menuList={BrowseMenu}
              subMenuList={Genres}
              toggleState={isGenresMenuOpen}
              toggleStateHandler={setIsGenreMenuOpen}
            />
          </div>

          <div className={styles.menu_section}>
            <MobileNavList
              title="news"
              menuList={ExtraMenu}
              subMenuList={News}
              toggleState={isNewsMenuOpen}
              toggleStateHandler={setIsNewsMenuOpen}
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
