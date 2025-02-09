"use client";

import { useState } from "react";
import { createPortal } from "react-dom";

import useWindowResolution from "@/hooks/useWindowResolution";
import useBodyOverflow from "@/hooks/useBodyOverflow";

import Menu from "./menu";

import { MdMoreVert } from "react-icons/md";

const Dropdown: React.FC<{
  children: React.ReactNode;
  position?: "top";
  align: "right" | "left";
  className?: string;
  triggerTitle: string;
  triggerClassName?: string;
  triggerActiveClassName?: string;
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
        <MdMoreVert className="size-6" />
      </button>

      {isDropdownOpen && (
        <Menu
          align={align}
          headerTitle={headerTitle}
          toogleDropdown={toogleDropdown}
          className={`hidden sm:grid ${menuClassName}`}
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
