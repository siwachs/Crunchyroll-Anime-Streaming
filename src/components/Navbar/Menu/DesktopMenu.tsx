import React from "react";

import styles from "../Navbar.module.css";

// React Redux
import { RootState } from "../../../Redux/store";
import { useSelector } from "react-redux";

const DesktopMenu: React.FC = () => {
  const { isDesktopMenuOpen } = useSelector((state: RootState) => state.navbar);

  return (
    <div
      className={`${styles.desktop_menu} ${
        isDesktopMenuOpen ? styles.active : ""
      }`}
    >
      DesktopMenu
    </div>
  );
};

export default DesktopMenu;
