import WatchAction from "./watchAction";
import AddToWatchListAction from "./addToWatchListAction";

import "./common.css";

const ContentActionButtons: React.FC<{
  tabIndex?: number;
  watchActionText: string;
  watchActionhref: string;
  className?: string;
}> = ({ tabIndex, watchActionText, watchActionhref, className = "" }) => {
  return (
    <div
      className={`relative flex justify-center gap-x-2.5 md:justify-start lg:gap-x-2.5 ${className}`}
    >
      <WatchAction
        tabIndex={tabIndex}
        watchActionhref={watchActionhref}
        watchActionText={watchActionText}
      />

      <AddToWatchListAction tabIndex={tabIndex} />
    </div>
  );
};

export default ContentActionButtons;
