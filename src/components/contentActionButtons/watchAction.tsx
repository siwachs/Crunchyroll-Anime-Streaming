import Link from "next/link";

import { ButtonType } from "./types";

import { HiOutlinePlay } from "react-icons/hi2";

import "./common.css";

const WatchAction: React.FC<{
  watchActionhref: string;
  watchActionText: string;
  tabIndex?: number;
  className?: string;
  buttonType?: ButtonType;
}> = ({
  watchActionhref,
  watchActionText,
  tabIndex = 0,
  className = "",
  buttonType = "one",
}) => {
  return (
    <Link
      tabIndex={tabIndex}
      href={watchActionhref}
      prefetch={false}
      className={`action-button flex w-full min-w-[7.5rem] flex-1 bg-[var(--app-background-crunchyroll-orange)] px-4 text-black hover:bg-[var(--app-hover-crunchyroll-orange)] hover:text-[var(--app-background-secondary)] focus-visible:bg-[var(--app-hover-crunchyroll-orange)] focus-visible:text-[var(--app-background-secondary)] sm:w-auto sm:flex-[0_0_auto] ${buttonType === "one" ? "" : "md:hidden"} ${className}`}
    >
      <span className="action-button-child">
        <HiOutlinePlay strokeWidth={2.08} className="size-6" />
        {watchActionText}
      </span>
    </Link>
  );
};

export default WatchAction;
