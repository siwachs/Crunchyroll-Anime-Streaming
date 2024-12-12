import { JSX } from "react";

import { MdClose } from "react-icons/md";

const DropDownContent: React.FC<{
  dropdownType: "modal" | "dropdown";
  dropdownTriggerTransparentHoverBg?: boolean;
  closeDropDown: () => void;
  title: string;
  dropdownContentScrollableList: JSX.Element[];
}> = ({
  dropdownType,
  dropdownTriggerTransparentHoverBg,
  closeDropDown,
  title,
  dropdownContentScrollableList,
}) => {
  return (
    <div
      className={`dropdown-content ${dropdownType} ${dropdownTriggerTransparentHoverBg ? "dropdown-is-aligned-left" : ""}`}
    >
      <header className="flex min-h-15 items-center justify-between bg-[var(--app-overlay-secondary)] p-4.5 sm:hidden">
        <h4 className="text-base font-medium">{title}</h4>

        <button title="Close" onClick={closeDropDown}>
          <MdClose className="size-6" />
        </button>
      </header>

      <div className="dropdown-content-scrollable">
        {dropdownContentScrollableList.length > 0 &&
          dropdownContentScrollableList}
      </div>
    </div>
  );
};

export default DropDownContent;
