import React from "react";
import { Link } from "react-router-dom";

import styles from "../Navbar.module.css";
import { BrowseMenu, Genres } from "../../../assets/data/navLinksData";

// React Redux
import { RootState } from "../../../Redux/store";
import { resetNavbar } from "../../../Redux/slices/navbarSlice";
import { useSelector, useDispatch } from "react-redux";

const DesktopMenu: React.FC = () => {
  const { isMenuOpen } = useSelector((state: RootState) => state.navbar);
  const dispatch = useDispatch();

  return (
    <div
      className={
        isMenuOpen
          ? `${styles.desktop_menu} ${styles.active}`
          : styles.desktop_menu
      }
    >
      <nav className={styles.menu_wrapper}>
        <div className={styles.menu_section_large}>
          <ul>
            {BrowseMenu.map((item) => (
              <li key={item.text} className={styles.list_item}>
                <Link
                  onClick={() => dispatch(resetNavbar())}
                  to={item.to}
                  className={styles.menu_item}
                >
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.genres_wrapper}>
          <small className={styles.menu_header}>Genres</small>
          <div className={styles.genres_section}>
            {Genres.map((item) => (
              <li key={item.text} className={styles.list_item}>
                <Link
                  onClick={() => dispatch(resetNavbar())}
                  to={item.to}
                  className={styles.menu_item}
                >
                  <h5>{item.text}</h5>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DesktopMenu;
