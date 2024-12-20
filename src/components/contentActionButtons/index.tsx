"use client";

import { forwardRef, RefObject } from "react";

import WatchAction from "./watchAction";

import { HiOutlineBookmark } from "react-icons/hi";

import "./common.css";

const ContentActionButtons = forwardRef<
  HTMLElement,
  {
    watchActionhref: string;
    watchActionText: string;
    className?: string;
    enableDetailsPageStyles?: boolean;
  }
>(
  (
    {
      watchActionhref,
      watchActionText,
      className = "",
      enableDetailsPageStyles,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className={`relative flex justify-center gap-x-2.5 md:justify-start lg:gap-x-2.5 ${className}`}
      >
        <WatchAction
          watchActionhref={watchActionhref}
          watchActionText={watchActionText}
          enableDetailsPageStyles={enableDetailsPageStyles}
        />

        <button
          className={`action-button flex-[0_0_auto] border-2 border-[var(--app-background-crunchyroll-orange)] text-[var(--app-background-crunchyroll-orange)] hover:border-[var(--app-hover-crunchyroll-orange)] hover:text-[var(--app-hover-crunchyroll-orange)] ${enableDetailsPageStyles ? "aspect-square sm:aspect-auto sm:px-4" : "aspect-square"}`}
        >
          {enableDetailsPageStyles ? (
            <span>
              <HiOutlineBookmark className="size-[22px]" />
              <span className="hidden sm:inline">Add To Watchlist</span>
            </span>
          ) : (
            <span>
              <HiOutlineBookmark className="size-[22px]" />
            </span>
          )}
        </button>
      </div>
    );
  },
);

export default ContentActionButtons;
