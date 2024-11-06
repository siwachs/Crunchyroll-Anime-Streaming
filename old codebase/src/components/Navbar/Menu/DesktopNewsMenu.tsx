import React from "react";
import { Link } from "react-router-dom";

import styles from "../Navbar.module.css";
import { News } from "../../../assets/data/navLinksData";

import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";

const DesktopNewsMenu: React.FC = () => {
  const { isDesktopNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );

  return (
    <div
      className={
        isDesktopNewsMenuOpen
          ? `${styles.desktop_news_menu} ${styles.active}`
          : styles.desktop_news_menu
      }
    >
      <nav className={styles.desktop_news_menu_wrapper}>
        <div className={styles.news_menu_section}>
          <ul>
            {News.map((item) => (
              <li key={item.text} className={styles.list_item}>
                <Link to={item.to} className={styles.menu_item}>
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default DesktopNewsMenu;
