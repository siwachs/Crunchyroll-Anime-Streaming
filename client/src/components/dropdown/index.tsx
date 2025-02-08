"use client";

import { MdMoreVert } from "react-icons/md";

const Dropdown: React.FC<{
  position?: "top";
  headerTitle: string;
  triggerTitle: string;
  seriesId: string;
  className?: string;
  triggerClassName?: string;
}> = ({
  position,
  headerTitle,
  triggerTitle,
  seriesId,
  className = "",
  triggerClassName = "",
}) => {
  return (
    <div
      className={`${position === "top" ? "absolute top-2 right-5" : ""} flex select-none ${className}`}
    >
      <button
        title={triggerTitle}
        className={`app-transition-colors flex cursor-pointer items-center justify-center p-2 hover:bg-[var(--app-background-secondary)] ${triggerClassName}`}
      >
        <MdMoreVert className="size-6" />
      </button>
    </div>
  );
};

export default Dropdown;
