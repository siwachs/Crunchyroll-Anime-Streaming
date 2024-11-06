import React from "react";
import { NavLink } from "react-router-dom";

import styles from "../Navbar.module.css";
import { MoreIcon } from "../../../assets/Icons";

import { useDispatch } from "react-redux";
import { resetNavbar } from "../../../Redux/slices/navbarSlice";

interface MenuList {
  to: string;
  text: string;
}

interface MobileNavListProps {
  title: string;
  menuList: MenuList[];
  subMenuList: MenuList[];
  toggleState: boolean;
  toggleStateHandler: any;
}

const MobileNavList: React.FC<MobileNavListProps> = ({
  title,
  menuList,
  subMenuList,
  toggleState,
  toggleStateHandler,
}) => {
  const dispatch = useDispatch();

  return (
    <ul>
      {menuList.map((item) => (
        <li key={item.text} className={styles.list_item}>
          <NavLink
            to={item.to}
            className={styles.menu_item}
            onClick={() => dispatch(resetNavbar())}
          >
            <span>{item.text}</span>
          </NavLink>
        </li>
      ))}
      <li className={styles.list_item}>
        <div
          role="button"
          className={`${styles.menu_item} relative`}
          onClick={() => dispatch(toggleStateHandler())}
        >
          <span>{title}</span>
          <span className={styles.more_icon_container}>
            <img
              src={MoreIcon}
              alt="more"
              className={toggleState ? styles.active : ""}
            />
          </span>
        </div>
        <ul
          className={`${styles.sub_menu_container} ${
            toggleState ? styles.active : ""
          }`}
        >
          {subMenuList.map((item) => (
            <li key={item.text} className={styles.list_item}>
              <NavLink
                to={item.to}
                className={styles.sub_menu_item}
                onClick={() => dispatch(resetNavbar())}
              >
                <h5>{item.text}</h5>
              </NavLink>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default MobileNavList;
