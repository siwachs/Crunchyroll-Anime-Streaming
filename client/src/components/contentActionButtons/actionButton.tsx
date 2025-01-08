import { JSX } from "react";
import Link from "next/link";

import "./common.css";

const ActionButton: React.FC<{
  tabIndex?: number;
  href?: string;
  Icon?: JSX.Element;
  text: string;
  shadow?: "action-button-shadow" | "";
  className?: string;
}> = ({ tabIndex = 0, href, Icon, text, shadow = "", className }) => {
  return href ? (
    <Link
      tabIndex={tabIndex}
      href={href}
      prefetch={false}
      className={`action-button flex w-full min-w-[7.5rem] px-4 sm:w-auto ${shadow} ${className}`}
    >
      <span className="action-button-child">
        {Icon}
        <span>{text}</span>
      </span>
    </Link>
  ) : (
    <button
      className={`action-button flex w-full min-w-[7.5rem] px-4 sm:w-auto ${shadow} ${className}`}
    >
      <span className="action-button-child">
        {Icon}
        <span>{text}</span>
      </span>
    </button>
  );
};

export default ActionButton;
