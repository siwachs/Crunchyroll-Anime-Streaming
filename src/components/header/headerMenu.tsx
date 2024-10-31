"use client";

import { useState, KeyboardEvent, MouseEvent } from "react";
import Link from "next/link";

import { triggerCallbackOnClickOrOnKeydown } from "@/lib/utils";

import { HiMiniBars3, HiMiniChevronDown } from "react-icons/hi2";

import { NAV_LINKS } from "@/data/header";

const HeaderMenu: React.FC = () => {
  const [headerState, setHeaderState] = useState<
    "close" | "open" | "genresListExpanded"
  >("open");

  function toogleMenu(e: KeyboardEvent | MouseEvent) {
    triggerCallbackOnClickOrOnKeydown(e, () =>
      setHeaderState((prev) => (prev === "close" ? "open" : "close")),
    );
  }

  function toogleGenresList(e: KeyboardEvent | MouseEvent) {}

  return (
    <div>
      <div
        data-active={headerState === "open"}
        onClick={toogleMenu}
        onKeyDown={toogleMenu}
        tabIndex={0}
        role="button"
        className="icon-wrapper"
      >
        <HiMiniBars3 className="size-6" />
      </div>

      <div data-active={headerState === "open"} className="menu-dropdown">
        <div className="menu-dropdown-content">
          <nav>
            <div className="menu-section">
              <small className="block select-none px-5 py-2.5 text-xs font-semibold uppercase leading-4 text-[#a0a0a0]">
                Browse
              </small>

              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.key} className="select-none">
                    {link.href ? (
                      <Link href={link.href} className="menu-title">
                        <span>{link.title}</span>
                      </Link>
                    ) : (
                      <div
                        data-active={headerState === "genresListExpanded"}
                        tabIndex={0}
                        role="button"
                        className="menu-title"
                      >
                        <span>{link.title}</span>

                        <span className="menu-title-icon absolute left-[calc(100vw-13%)] top-1/2 -translate-y-1/2">
                          <HiMiniChevronDown className="size-6" />
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="menu-section">
              <ul>
                <li className="select-none">
                  <div className="menu-title">
                    Games (Currently Not Available)
                  </div>
                </li>

                <li className="select-none">
                  <div className="menu-title">
                    News (Currently Not Available)
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
