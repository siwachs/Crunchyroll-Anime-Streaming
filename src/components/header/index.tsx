"use client";

import { useState, KeyboardEvent, MouseEvent } from "react";
import Link from "next/link";

import { triggerCallbackOnClickOrOnKeydown } from "@/lib/utils";

import HeaderMenu from "./headerMenu";

import { HeaderState } from "./types";

import { HiSearch, HiOutlineUser, HiOutlineBookmark } from "react-icons/hi";

import { HeaderLogoMobileOnly, HeaderLogoLarge } from "@/assets/HeaderLogo";
import "./index.css";

const Header = () => {
  const [headerState, setHeaderState] = useState<HeaderState>("close");

  function closeHeader(e: KeyboardEvent | MouseEvent) {
    triggerCallbackOnClickOrOnKeydown(e, () => setHeaderState("close"));
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link href="/" className="block px-[1.125rem]">
            <HeaderLogoMobileOnly className="sm:hidden" />
            <HeaderLogoLarge className="hidden sm:block" />
          </Link>
        </div>

        <div className="header-menu">
          <HeaderMenu
            headerState={headerState}
            setHeaderState={setHeaderState}
          />
        </div>

        <div className="header-actions">
          <ul className="flex">
            <li>
              <div tabIndex={0} role="button" className="icon-wrapper">
                <HiSearch className="size-6" />
              </div>
            </li>

            <li>
              <div tabIndex={0} role="button" className="icon-wrapper">
                <HiOutlineBookmark className="size-6" />
              </div>
            </li>

            <li>
              <div tabIndex={0} role="button" className="icon-wrapper">
                <HiOutlineUser className="size-6" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        tabIndex={0}
        role="button"
        data-active={
          headerState === "open" || headerState === "genresListExpanded"
        }
        className="page-overlay"
        onClick={closeHeader}
        onKeyDown={closeHeader}
        aria-label="Close Menu"
      />
    </header>
  );
};

export default Header;
