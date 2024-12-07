import Link from "next/link";

import { HiOutlinePlay } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";

import "./index.css";

const ContentActionButtons: React.FC<{
  className?: string;
  watchActionhref: string;
  watchActionText: string;
}> = ({ className = "", watchActionhref, watchActionText }) => {
  return (
    <div
      className={`relative flex justify-center gap-x-2.5 sm:inline-flex md:justify-start lg:gap-x-2.5 ${className}`}
    >
      <Link
        href={watchActionhref}
        prefetch={false}
        className="action-button watch-action-button"
      >
        <span>
          <HiOutlinePlay strokeWidth={2.08} className="size-6" />
          {watchActionText}
        </span>
      </Link>

      <button className="action-button add-to-watchlist-action-button">
        <span>
          <HiOutlineBookmark className="size-[22px]" />
        </span>
      </button>
    </div>
  );
};

export default ContentActionButtons;
