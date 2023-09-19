import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../Navbar.module.css";
import { DesktopIconMore } from "../../../assets/Icons";
import { DesktopNavList } from "../../../assets/data/mobileNavLinksData";

// Redux
import { RootState } from "../../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateDesktopNavbarState } from "../../../Redux/slices/navbarSlice";

// Utils

const NavList: React.FC = () => {
  const { isMenuOpen, isDesktopMenuOpen, isDesktopNewsMenuOpen } = useSelector(
    (state: RootState) => state.navbar
  );
  const dispatch = useDispatch();
  console.log("Desk=", isDesktopMenuOpen);
  console.log("news", isDesktopNewsMenuOpen);

  return (
    <nav>
      {DesktopNavList.map((item, index) =>
        item.isDropDown ? (
          <div
            role="button"
            key={index}
            className={`hover_icon ${styles.desktop_nav_item} ${
              item.menuType === "browse"
                ? isMenuOpen || isDesktopMenuOpen
                  ? "active"
                  : ""
                : isDesktopNewsMenuOpen
                ? "active"
                : ""
            }`}
            onClick={() =>
              dispatch(
                updateDesktopNavbarState({
                  key:
                    item.menuType === "browse"
                      ? "isDesktopMenuOpen"
                      : "isDesktopNewsMenuOpen",
                })
              )
            }
          >
            <span>{item.text}</span>
            <img
              src={DesktopIconMore}
              alt="more"
              className={styles.more_icon_desktop}
            />
          </div>
        ) : (
          <div key={index} className={`hover_icon ${styles.desktop_nav_item}`}>
            <NavLink to={item.to}>
              <span>{item.text}</span>
            </NavLink>
          </div>
        )
      )}
    </nav>
  );
};

export default NavList;
