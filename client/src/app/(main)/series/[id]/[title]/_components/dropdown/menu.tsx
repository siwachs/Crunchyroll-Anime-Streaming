import { MdClose } from "react-icons/md";

const Menu: React.FC<{
  children: React.ReactNode;
  align?: "right" | "left";
  headerTitle: string;
  toogleDropdown: () => void;
  className?: string;
}> = ({ children, align, headerTitle, toogleDropdown, className = "" }) => {
  return (
    <div
      className={`fixed top-0 right-0 left-0 z-100 grid h-full min-w-[12.5rem] grid-cols-[minmax(0,auto)_minmax(0,1fr)] grid-rows-[minmax(0,auto)_minmax(0,_1fr)_minmax(0,auto)] overflow-hidden bg-[var(--app-background-secondary)] sm:absolute sm:top-full sm:h-auto sm:max-h-[28.75rem] sm:max-w-[calc(100vw-5rem)] ${align === "right" ? "sm:left-auto" : "sm:right-auto"} ${className}`}
    >
      <header className="flex items-center justify-between bg-[var(--app-overlay-secondary)] px-5 py-4.5 sm:hidden">
        <h4>{headerTitle}</h4>

        <button onClick={toogleDropdown} className="cursor-pointer">
          <MdClose className="size-6" />
        </button>
      </header>

      <main className="scrollbar-thin overflow-y-auto py-3">{children}</main>

      <footer className="sm:hidden"></footer>
    </div>
  );
};

export default Menu;
