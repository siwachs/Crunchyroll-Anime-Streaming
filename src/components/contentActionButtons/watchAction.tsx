import Link from "next/link";

import { HiOutlinePlay } from "react-icons/hi2";

const WatchAction: React.FC<{
  watchActionhref: string;
  watchActionText: string;
  enableDetailsPageStyles?: boolean;
  className?: string;
}> = ({
  watchActionhref,
  watchActionText,
  enableDetailsPageStyles,
  className = "",
}) => {
  return (
    <Link
      href={watchActionhref}
      prefetch={false}
      className={`action-button inline-flex w-full min-w-[7.5rem] flex-1 justify-center bg-[var(--app-background-crunchyroll-orange)] px-4 text-black hover:bg-[var(--app-hover-crunchyroll-orange)] hover:text-[var(--app-background-secondary)] sm:w-auto sm:flex-[0_0_auto] ${enableDetailsPageStyles ? "md:hidden" : ""} ${className}`}
    >
      <span>
        <HiOutlinePlay strokeWidth={2.08} className="size-6" />
        {watchActionText}
      </span>
    </Link>
  );
};

export default WatchAction;
