"use client";

import { JSX, useState } from "react";
import { createPortal } from "react-dom";

import DropDownContent from "./dropdownContent";

import { DropdownTriggerType, Position } from "./types";

import "./index.css";

const Dropdown: React.FC<{
  position?: Position;
  title?: string;
  className?: string;
  Icon: JSX.Element;
  triggerTitle?: string;
  triggerHeader?: string;
  dropdownTitle: string;
  dropdownItems: JSX.Element[];
  dropdownTriggerType?: DropdownTriggerType;
}> = ({
  position = "right",
  title,
  className = "",
  Icon,
  triggerTitle,
  triggerHeader,
  dropdownTitle,
  dropdownItems,
  dropdownTriggerType = "",
}) => {
  const [isDropdownTriggered, setIsDropdownTriggered] = useState(false);

  function toogleDropdownTrigger() {
    setIsDropdownTriggered((prev) => !prev);
  }

  function closeDropDown() {
    setIsDropdownTriggered(false);
  }

  return (
    <div className="relative flex select-none">
      <button
        title={title}
        onClick={toogleDropdownTrigger}
        className={`dropdown-trigger app-transition-colors flex items-center text-[var(--meta-color)] ${dropdownTriggerType} ${isDropdownTriggered ? "active" : ""} ${className}`}
      >
        {Icon}
        {triggerTitle && (
          <span className="ml-2 hidden text-sm/leading-4.5 font-black uppercase sm:inline">
            {triggerTitle}
          </span>
        )}
        {triggerHeader && (
          <h4 className="ml-2.5 truncate py-2 text-base font-semibold sm:text-lg/leading-6.5">
            {triggerHeader}
          </h4>
        )}
      </button>

      {isDropdownTriggered &&
        createPortal(
          <DropDownContent
            dropdownType="modal"
            closeDropDown={closeDropDown}
            title={dropdownTitle}
            dropdownItems={dropdownItems}
          />,
          document.body,
        )}

      <DropDownContent
        dropdownType="dropdown"
        position={position}
        closeDropDown={closeDropDown}
        title={dropdownTitle}
        dropdownItems={dropdownItems}
      />
    </div>
  );
};

export default Dropdown;
