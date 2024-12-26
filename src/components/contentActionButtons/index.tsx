"use client";

import { forwardRef, RefObject } from "react";

import WatchAction from "./watchAction";
import AddToWatchListAction from "./addToWatchListAction";

import { ButtonType } from "./types";

import "./common.css";
import ActionButton from "./actionButton";

const ContentActionButtons = forwardRef<
  HTMLElement,
  {
    watchActionhref: string;
    watchActionText: string;
    tabIndex?: number;
    className?: string;
    buttonType?: ButtonType;
  }
>(
  (
    {
      watchActionhref,
      watchActionText,
      tabIndex = 0,
      className = "",
      buttonType = "one",
    },
    ref,
  ) => {
    return (
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className={`relative flex justify-center gap-x-2.5 md:justify-start lg:gap-x-2.5 ${className}`}
      >
        <WatchAction
          tabIndex={tabIndex}
          watchActionhref={watchActionhref}
          watchActionText={watchActionText}
          buttonType={buttonType}
        />

        <AddToWatchListAction tabIndex={tabIndex} buttonType={buttonType} />
      </div>
    );
  },
);

export default ContentActionButtons;
