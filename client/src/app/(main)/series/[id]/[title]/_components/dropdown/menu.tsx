import { ReactElement, cloneElement } from "react";

import { MdClose } from "react-icons/md";

import "./menu.css";

const Menu: React.FC<{
  children: ReactElement<{ toogleDropdown?: () => void }>;
  align?: "right" | "left";
  headerTitle: string;
  toogleDropdown: () => void;
  className?: string;
}> = ({ children, align, headerTitle, toogleDropdown, className = "" }) => {
  return (
    <div
      className={`menu fixed top-0 right-0 left-0 z-100 flex h-full flex-col overflow-hidden bg-[var(--app-background-secondary)] sm:absolute sm:top-full sm:h-auto sm:max-h-[28.75rem] sm:max-w-[calc(100vw-5rem)] sm:min-w-[12.5rem] ${align === "right" ? "sm:left-auto" : "sm:right-auto"} ${className}`}
    >
      <header className="flex items-center justify-between bg-[var(--app-overlay-secondary)] px-5 py-4.5 sm:hidden">
        <h4>{headerTitle}</h4>

        <button onClick={toogleDropdown} className="cursor-pointer">
          <MdClose className="size-6" />
        </button>
      </header>

      <main className="scrollbar-thin flex-1 overflow-y-auto py-3">
        {cloneElement(children, { toogleDropdown })}
      </main>

      <footer className="sm:hidden"></footer>
    </div>
  );
};

export default Menu;
