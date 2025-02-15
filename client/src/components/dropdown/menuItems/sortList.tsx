import { useSeasonEpisodes } from "@/providers/seasonEpisodesProvider";

import { SortOption } from "@/providers/types";

const SortList: React.FC<{
  toogleDropdown?: () => void;
}> = ({ toogleDropdown }) => {
  const { currentSortOption, setCurrentSortOption } = useSeasonEpisodes();

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
