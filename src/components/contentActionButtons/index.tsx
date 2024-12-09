import WatchAction from "./watchAction";

import { HiOutlineBookmark } from "react-icons/hi";

const ContentActionButtons: React.FC<{
  watchActionhref: string;
  watchActionText: string;
  enableDetailsPageStyles?: boolean;
}> = ({ watchActionhref, watchActionText, enableDetailsPageStyles }) => {
  return (
    <div
      className={`relative flex gap-x-2.5 lg:gap-x-2.5 ${enableDetailsPageStyles ? "mb-7.5" : "justify-center md:justify-start"}`}
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
};

export default ContentActionButtons;
