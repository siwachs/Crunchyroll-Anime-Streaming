import { KeyboardEvent, MouseEvent, Dispatch, SetStateAction } from "react";
import Link from "next/link";

import { triggerCallbackOnClickOrOnKeydown } from "@/lib/utils";

import { HeaderState } from "./types";

import { HiMiniBars3, HiMiniChevronDown } from "react-icons/hi2";
import { FaCaretDown } from "react-icons/fa";

import { NAV_LINKS, GENRES } from "@/data/header";
import "./header-menu.css";

const HeaderMenu: React.FC<{
  headerState: HeaderState;
  setHeaderState: Dispatch<SetStateAction<HeaderState>>;
}> = ({ headerState, setHeaderState }) => {
  function toogleMenu() {
    setHeaderState((prev) => (prev === "close" ? "open" : "close"));
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
      <button
        data-active={
          headerState === "open" || headerState === "genresListExpanded"
        }
        onClick={toogleMenu}
        className="icon-wrapper"
      >
        <span className="hidden select-none lg:flex">Browse</span>
        <HiMiniBars3 className="size-6 lg:hidden" />
        <FaCaretDown className="mx-1.5 hidden size-4 lg:flex" />
      </button>

      <div
        data-active={
          headerState === "open" || headerState === "genresListExpanded"
        }
        className="menu-dropdown"
      >
        <nav className="menu-dropdown-content">
          <section className="menu-section border-b-2 border-[var(--app-border-primary)] lg:border-none">
            <small className="small-title">Browse</small>

            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.title} className="select-none">
                  {link?.children ? (
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

                        <span className="menu-title-icon">
                          <HiMiniChevronDown className="size-6" />
                        </span>
                      </div>

                      <ul
                        data-active={headerState === "genresListExpanded"}
                        className="hidden data-[active=true]:block data-[active=true]:bg-[var(--app-background-tertiary)]"
                      >
                        {link.children.map((child) => (
                          <li key={child.title}>
                            <Link
                              href={child.href}
                              prefetch={false}
                              className="submenu-title"
                            >
                              <h5>{child.title}</h5>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      prefetch={false}
                      className="menu-title"
                    >
                      <span>{link.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Genre Menu on Large Screen  */}
          <section className="menu-section hidden border-l-2 border-[var(--app-border-primary)] lg:block">
            <small className="small-title">Genres</small>

            <ul className="genres-section">
              {GENRES.map((genre) => (
                <li key={genre.title}>
                  <Link
                    href={genre.href}
                    prefetch={false}
                    className="submenu-title app-transition-colors"
                  >
                    <h5>{genre.title}</h5>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Hide on Large Screen */}
          <section className="menu-section lg:hidden">
            <ul>
              <li className="select-none">
                <div className="menu-title app-transition-colors">
                  Games (Currently Not Available)
                </div>
              </li>

              <li className="select-none">
                <div className="menu-title app-transition-colors">
                  News (Currently Not Available)
                </div>
              </li>
            </ul>
          </section>
        </nav>
      </div>
    </div>
  );
};

export default HeaderMenu;
