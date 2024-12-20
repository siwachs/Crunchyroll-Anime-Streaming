"use client";

import { useState, KeyboardEvent, MouseEvent } from "react";
import Link from "next/link";

import useBodyOverflow from "@/hooks/useBodyOverflow";
import { triggerCallbackOnClickOrOnKeydown } from "@/lib/utils";

import HeaderMenu from "./headerMenu";

import { HeaderState } from "./types";

import { HiSearch, HiOutlineUser, HiOutlineBookmark } from "react-icons/hi";

import { HeaderLogoMobileOnly, HeaderLogoLarge } from "@/assets/HeaderLogo";
import "./index.css";

const Header = () => {
  const [headerState, setHeaderState] = useState<HeaderState>("close");

  useBodyOverflow(headerState !== "close");

  function closeHeader(e: KeyboardEvent | MouseEvent) {
    triggerCallbackOnClickOrOnKeydown(e, () => setHeaderState("close"));
  }

  return (
    <header className="header">
      <div className="container-cmp header-container px-0">
        <div title="Company Logo" className="header-logo">
          <Link href="/" prefetch={false} className="block px-4.5">
            <HeaderLogoMobileOnly className="app-transition-colors sm:hidden" />
            <HeaderLogoLarge className="app-transition-colors hidden sm:block" />
          </Link>
        </div>

        <div title="Menu" className="header-menu">
          <HeaderMenu
            headerState={headerState}
            setHeaderState={setHeaderState}
          />
        </div>

        <div className="header-actions">
          <ul className="flex">
            <li>
              <button title="Search" className="icon-wrapper">
                <HiSearch className="size-6" />
              </button>
            </li>

            <li>
              <button title="Watchlist" className="icon-wrapper">
                <HiOutlineBookmark className="size-6" />
              </button>
            </li>

            <li>
              <button title="Account Menu" className="icon-wrapper">
                <HiOutlineUser className="size-6" />
              </button>
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
        className="app-overlay"
        onClick={closeHeader}
        onKeyDown={closeHeader}
        aria-label="Close Menu"
      />
    </header>
  );
};

export default Header;
