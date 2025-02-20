"use client";

import { useState, ReactElement, JSX } from "react";
import { createPortal } from "react-dom";

import useWindowResolution from "@/hooks/useWindowResolution";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import Menu from "./menu";

const Dropdown: React.FC<{
  children: ReactElement<{ toogleDropdown?: () => void }>;
  position?: "top";
  align: "right" | "left";
  className?: string;
  triggerTitle?: string;
  triggerClassName?: string;
  triggerActiveClassName?: string;
  Icon: JSX.Element;
  triggerLabel?: JSX.Element;
  menuClassName?: string;
  headerTitle: string;
}> = ({
  children,
  position,
  align,
  className = "",
  triggerTitle,
  triggerClassName = "",
  triggerActiveClassName = "",
  Icon,
  triggerLabel,
  menuClassName = "",
  headerTitle,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { width } = useWindowResolution();

  useBodyOverflow(width < 568 && isDropdownOpen);

  function toogleDropdown() {
    setIsDropdownOpen((prev) => !prev);
  }

  return (
    <div
      className={`${position === "top" ? "absolute top-2 right-5" : "relative"} flex select-none ${className}`}
    >
      <button
        title={triggerTitle}
        onClick={toogleDropdown}
        className={`app-transition-colors flex cursor-pointer items-center justify-center ${triggerClassName} ${isDropdownOpen ? triggerActiveClassName : ""}`}
      >
        {Icon}
        {triggerLabel}
      </button>

      {isDropdownOpen && (
        <Menu
          align={align}
          headerTitle={headerTitle}
          toogleDropdown={toogleDropdown}
          className={`hidden sm:flex ${menuClassName}`}
        >
          {children}
        </Menu>
      )}

      {isDropdownOpen &&
        createPortal(
          <Menu
            headerTitle={headerTitle}
            toogleDropdown={toogleDropdown}
            className="sm:hidden"
          >
            {children}
          </Menu>,
          document.body,
        )}
    </div>
  );
};

export default Dropdown;
