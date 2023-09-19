import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../Navbar.module.css";
import { BrowseMenu, Genres } from "../../../assets/data/mobileNavLinksData";

// React Redux
import { useDispatch } from "react-redux";
import { resetNavbar } from "../../../Redux/slices/navbarSlice";

const DesktopMenu: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.desktop_menu}>
      <nav className={styles.desktop_menu_wrapper}>
        <div className={styles.desktop_menu_browse}>
          <ul>
            {BrowseMenu.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={styles.desktop_menu_item}
                  onClick={() => dispatch(resetNavbar())}
                >
                  <span>{item.text}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.desktop_menu_genres}>
          <small className={styles.menu_heading}>genres</small>
          <ul className={styles.desktop_genres}>
            {Genres.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={styles.desktop_genres_item}
                  onClick={() => dispatch(resetNavbar())}
                >
                  <h5>{item.text}</h5>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default DesktopMenu;
