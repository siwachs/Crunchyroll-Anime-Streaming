import { JSX } from "react";

import { Position } from "./types";

import { MdClose } from "react-icons/md";

const DropDownContent: React.FC<{
  dropdownType: "modal" | "dropdown";
  position?: Position;
  closeDropDown: () => void;
  title: string;
  dropdownItems: JSX.Element[];
}> = ({
  dropdownType,
  position = "right",
  closeDropDown,
  title,
  dropdownItems,
}) => {
  return (
    <div
      className={`dropdown-content ${dropdownType} ${position === "right" ? "dropdown-is-right-aligned" : "dropdown-is-left-aligned"}`}
    >
      <header className="flex min-h-15 items-center justify-between bg-[var(--app-overlay-secondary)] p-4.5 sm:hidden">
        <h4 className="text-base font-medium">{title}</h4>

        <button title="Close" onClick={closeDropDown}>
          <MdClose className="size-6" />
        </button>
      </header>

      <div className="dropdown-items">{dropdownItems}</div>
    </div>
  );
};

export default DropDownContent;
