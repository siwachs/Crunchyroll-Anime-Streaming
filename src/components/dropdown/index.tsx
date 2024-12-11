"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import DropDownContent from "./dropdownContent";

import "./index.css";

const Dropdown: React.FC<{
  title?: string;
  dropdownTriggerClassName?: string;
  Icon: JSX.Element;
  dropdownTriggerTitle?: string;
  dropdownContentTitle: string;
  dropdownContentScrollableList: JSX.Element[];
}> = ({
  title,
  dropdownTriggerClassName = "",
  Icon,
  dropdownTriggerTitle,
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
        autoFocus
        title={title}
        onClick={toogleDropdownTrigger}
        className={`dropdown-trigger ${isDropdownTriggered ? "active" : ""} ${dropdownTriggerClassName}`}
      >
        {Icon}
        {dropdownTriggerTitle && (
          <span className="ml-2 hidden text-sm/leading-4.5 font-black uppercase sm:inline">
            {dropdownTriggerTitle}
          </span>
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
        closeDropDown={closeDropDown}
        title={dropdownContentTitle}
        dropdownContentScrollableList={dropdownContentScrollableList}
      />
    </div>
  );
};

export default Dropdown;
