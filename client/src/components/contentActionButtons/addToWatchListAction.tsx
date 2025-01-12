import { ButtonType } from "./types";

import { HiOutlineBookmark } from "react-icons/hi";

import "./common.css";

const AddToWatchListAction: React.FC<{
  tabIndex?: number;
  buttonType?: ButtonType;
}> = ({ tabIndex = 0, buttonType = "one" }) => {
  return (
    <button
      tabIndex={tabIndex}
      className={`action-button action-button-shadow app-transition-colors flex flex-[0_0_auto] text-[var(--app-background-crunchyroll-orange)] hover:text-[var(--app-hover-crunchyroll-orange)] focus-visible:text-[var(--app-hover-crunchyroll-orange)] ${buttonType === "one" ? "aspect-square" : "aspect-square sm:aspect-auto sm:px-4"}`}
    >
      {buttonType === "one" ? (
        <span className="action-button-child">
          <HiOutlineBookmark className="size-[22px]" />
        </span>
      ) : (
        <span className="action-button-child">
          <HiOutlineBookmark className="size-[22px]" />
          <span className="hidden sm:inline">Add To Watchlist</span>
        </span>
      )}
    </button>
  );
};

export default AddToWatchListAction;
