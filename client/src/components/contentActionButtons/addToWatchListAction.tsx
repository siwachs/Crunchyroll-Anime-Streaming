import { AddToWatchListOutlined } from "@/assets/addToWatchListIcons";

import "./common.css";

const AddToWatchListAction: React.FC<{
  tabIndex?: number;
}> = ({ tabIndex = 0 }) => {
  return (
    <button
      tabIndex={tabIndex}
      className="action-button action-button-shadow app-transition-colors flex aspect-square flex-[0_0_auto] text-[var(--app-background-crunchyroll-orange)] hover:text-[var(--app-hover-crunchyroll-orange)] focus-visible:text-[var(--app-hover-crunchyroll-orange)]"
    >
      <span className="action-button-child">
        <AddToWatchListOutlined className="size-6 fill-current" />
      </span>
    </button>
  );
};

export default AddToWatchListAction;
