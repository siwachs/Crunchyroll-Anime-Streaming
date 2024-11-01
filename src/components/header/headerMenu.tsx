import { KeyboardEvent, MouseEvent, Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { triggerCallbackOnClickOrOnKeydown } from "@/lib/utils";

import { HeaderState } from "./types";

import { HiMiniBars3, HiMiniChevronDown } from "react-icons/hi2";

import { NAV_LINKS, GENRES } from "@/data/header";
import "./headerMenu.css";

const HeaderMenu: React.FC<{
  headerState: HeaderState;
  setHeaderState: Dispatch<SetStateAction<HeaderState>>;
}> = ({ headerState, setHeaderState }) => {
  function toogleMenu(e: KeyboardEvent | MouseEvent) {
    triggerCallbackOnClickOrOnKeydown(e, () =>
      setHeaderState((prev) => (prev === "close" ? "open" : "close")),
    );
  }

  function toogleGenresList(e: KeyboardEvent | MouseEvent) {
    triggerCallbackOnClickOrOnKeydown(e, () =>
      setHeaderState((prev) =>
        prev === "genresListExpanded" ? "open" : "genresListExpanded",
      ),
    );
  }

  return (
    <div>
      <div
        data-active={
          headerState === "open" || headerState === "genresListExpanded"
        }
        onClick={toogleMenu}
        onKeyDown={toogleMenu}
        tabIndex={0}
        role="button"
        className="icon-wrapper"
      >
        <HiMiniBars3 className="size-6" />
      </div>

      <div
        data-active={
          headerState === "open" || headerState === "genresListExpanded"
        }
        className="menu-dropdown"
      >
        <nav className="menu-dropdown-content">
          <div className="menu-section">
            <small className="block select-none px-5 py-2.5 text-xs font-semibold uppercase leading-4 text-[#a0a0a0]">
              Browse
            </small>

            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.title} className="select-none">
                  {link.href ? (
                    <Link href={link.href} className="menu-title">
                      <span>{link.title}</span>
                    </Link>
                  ) : (
                    <>
                      <div
                        data-active={headerState === "genresListExpanded"}
                        onClick={toogleGenresList}
                        onKeyDown={toogleGenresList}
                        tabIndex={0}
                        role="button"
                        className="menu-title"
                      >
                        <span>{link.title}</span>

                        <span className="menu-title-icon absolute left-[calc(100vw-13%)] top-1/2 -translate-y-1/2 sm:left-[15.75rem]">
                          <HiMiniChevronDown className="size-6" />
                        </span>
                      </div>

                      <ul
                        data-active={headerState === "genresListExpanded"}
                        className="hidden data-[active=true]:block data-[active=true]:bg-[var(--app-background-tertiary)]"
                      >
                        {GENRES.map((genre) => (
                          <li key={genre.title}>
                            <Link href={genre.href} className="submenu-title">
                              <h5>{genre.title}</h5>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
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
                <div className="menu-title">News (Currently Not Available)</div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMenu;
