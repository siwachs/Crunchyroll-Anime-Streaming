"use client";

import { JSX, useState } from "react";
import { createPortal } from "react-dom";

import DropDownContent from "./dropdownContent";

import "./index.css";

const Dropdown: React.FC<{
  title?: string;
  dropdownTriggerClassName?: string;
  dropdownTriggerTransparentHoverBg?: boolean;
  dropdownTriggerNoHoverBg?: boolean;
  Icon: JSX.Element;
  dropdownTriggerTitle?: string;
  dropdownTriggerHeader?: string;
  dropdownContentTitle: string;
  dropdownContentScrollableList: JSX.Element[];
}> = ({
  title,
  dropdownTriggerClassName = "",
  dropdownTriggerTransparentHoverBg,
  dropdownTriggerNoHoverBg,
  Icon,
  dropdownTriggerTitle,
  dropdownTriggerHeader,
  dropdownContentTitle,
  dropdownContentScrollableList = [],
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
        className={`dropdown-trigger app-transition-colors text-[var(--meta-color)] ${isDropdownTriggered ? "active" : ""} ${dropdownTriggerTransparentHoverBg ? "dropdown-trigger-transparent-hover-bg" : ""} ${dropdownTriggerNoHoverBg ? "dropdown-trigger-no-hover-bg" : ""} ${dropdownTriggerClassName}`}
      >
        {Icon}
        {dropdownTriggerTitle && (
          <span className="ml-2 hidden text-sm/leading-4.5 font-black uppercase sm:inline">
            {dropdownTriggerTitle}
          </span>
        )}
        {dropdownTriggerHeader && (
          <h4 className="ml-2.5 truncate py-2 text-base font-semibold sm:text-lg/[1.625rem]">
            {dropdownTriggerHeader}
          </h4>
        )}
      </button>

      {isDropdownTriggered &&
        createPortal(
          <DropDownContent
            dropdownType="modal"
            closeDropDown={closeDropDown}
            title={dropdownContentTitle}
            dropdownContentScrollableList={dropdownContentScrollableList}
          />,
          document.body,
        )}

      <DropDownContent
        dropdownType="dropdown"
        dropdownTriggerTransparentHoverBg={dropdownTriggerTransparentHoverBg}
        closeDropDown={closeDropDown}
        title={dropdownContentTitle}
        dropdownContentScrollableList={dropdownContentScrollableList}
      />
    </div>
  );
};

export default Dropdown;
