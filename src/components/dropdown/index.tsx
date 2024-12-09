"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import "./index.css";

const Dropdown: React.FC<{
  title?: string;
  dropdownTriggerClassName?: string;
  Icon: JSX.Element;
  dropdownTriggerTitle?: string;
}> = ({ title, dropdownTriggerClassName = "", Icon, dropdownTriggerTitle }) => {
  const [isDropdownTriggered, setIsDropdownTriggered] = useState(false);

  function toogleDropdownTrigger() {
    setIsDropdownTriggered(true);
  }

  return (
    <div className="relative flex select-none">
      <button
        title={title}
        onClick={toogleDropdownTrigger}
        className={`dropdown-trigger ${dropdownTriggerClassName}`}
      >
        {Icon}
        {dropdownTriggerTitle && (
          <span className="ml-2 hidden text-sm/leading-4.5 font-black uppercase sm:inline">
            {dropdownTriggerTitle}
          </span>
        )}
      </button>

      <div className="select-content hidden"></div>
    </div>
  );
};

export default Dropdown;
