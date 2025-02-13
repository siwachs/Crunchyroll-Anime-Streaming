import { Dispatch, SetStateAction } from "react";

import { SortOption } from "@/app/(main)/series/[id]/[title]/page.types";

const SortList: React.FC<{
  currentSortOption: SortOption;
  setCurrentSortOption: Dispatch<SetStateAction<SortOption>>;
  toogleDropdown?: () => void;
}> = ({ currentSortOption, setCurrentSortOption, toogleDropdown }) => {
  function changeSortOption(sortOption: SortOption) {
    setCurrentSortOption(sortOption);

    if (toogleDropdown) toogleDropdown();
  }

  return (
    <>
      <button
        className="menu-item"
        data-active={currentSortOption === "Oldest"}
        onClick={changeSortOption.bind(null, "Oldest")}
      >
        Oldest
      </button>

      <button
        className="menu-item"
        data-active={currentSortOption === "Newest"}
        onClick={changeSortOption.bind(null, "Newest")}
      >
        Newest
      </button>
    </>
  );
};

export default SortList;
