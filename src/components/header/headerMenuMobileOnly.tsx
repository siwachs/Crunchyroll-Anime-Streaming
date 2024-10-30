"use client";

import { useState, KeyboardEvent, MouseEvent } from "react";
import Link from "next/link";

import { HiMiniBars3 } from "react-icons/hi2";

import { NAV_LINKS } from "@/data/header";
import "./headerMenuMobileOnly.css";

const HeaderMenuMobileOnly: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  function toogleMenu(e: KeyboardEvent | MouseEvent) {
    if (e.type === "click") return setIsOpen((prev) => !prev);

    const keyboardEvent = e as KeyboardEvent;
    if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ")
      setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <div
        data-active={isOpen}
        onClick={toogleMenu}
        onKeyDown={toogleMenu}
        tabIndex={0}
        role="button"
        className="icon-wrapper"
      >
        <HiMiniBars3 className="size-6" />
      </div>

      <div data-active={isOpen} className="menu-dropdown">
        <div className="menu-dropdown-content">
          <nav>
            <div>
              <small className="block select-none px-5 py-2.5 text-xs font-semibold uppercase leading-4 text-[#a0a0a0]">
                Browse
              </small>

              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link} className="select-none">
                    <Link href="/"></Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div>Section 2</div> */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenuMobileOnly;
