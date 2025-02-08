import { HiOutlineBookmark } from "react-icons/hi";

import "./common.css";

const AddToWatchListAction: React.FC<{
  tabIndex?: number;
}> = ({ tabIndex = 0 }) => {
  return (
    <button
      tabIndex={tabIndex}
      className="action-button action-button-shadow app-transition-colors flex aspect-square flex-[0_0_auto] cursor-pointer text-[var(--app-background-crunchyroll-orange)] hover:text-[var(--app-hover-crunchyroll-orange)] focus-visible:text-[var(--app-hover-crunchyroll-orange)]"
    >
      <span className="action-button-child">
        <HiOutlineBookmark className="size-[22px]" />
      </span>
    </button>
  );
};

export default AddToWatchListAction;
