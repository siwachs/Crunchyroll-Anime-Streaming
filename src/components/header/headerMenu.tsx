import { KeyboardEvent, MouseEvent, Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { triggerCallbackOnClickOrOnKeydown } from "@/lib/utils";

import { HeaderState } from "./types";

import { HiMiniBars3, HiMiniChevronDown } from "react-icons/hi2";
import { FaCaretDown } from "react-icons/fa";

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
        <span className="hidden select-none lg:flex">Browse</span>
        <HiMiniBars3 className="size-6 lg:hidden" />
        <FaCaretDown className="mx-1.5 hidden size-4 lg:flex" />
      </div>

      <div
        data-active={
          headerState === "open" || headerState === "genresListExpanded"
        }
        className="menu-dropdown"
      >
        <nav className="menu-dropdown-content">
          <section className="menu-section">
            <small className="small-title lg:hidden">Browse</small>

            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.title} className="select-none">
                  {link.href ? (
                    <Link href={link.href} className="menu-title">
                      <span>{link.title}</span>
                    </Link>
                  ) : (
                    <div className="lg:hidden">
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
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="menu-section hidden lg:block">
            <small className="small-title">Genres</small>

            <ul className="genres-section">
              {GENRES.map((genre) => (
                <li key={genre.title}>
                  <Link href={genre.href} className="submenu-title">
                    <h5>{genre.title}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="menu-section lg:hidden">
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
          </section>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMenu;
