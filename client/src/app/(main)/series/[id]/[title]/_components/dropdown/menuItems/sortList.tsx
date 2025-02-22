import { useSeasonEpisodes } from "@/providers/seasonEpisodesProvider";

import { SortOrder } from "@/providers/seasonEpisodesProvider.types";

const SortList: React.FC<{
  toogleDropdown?: () => void;
}> = ({ toogleDropdown }) => {
  const {
    seasonEpisodesPayload: { currentSortOrder },
    setSeasonEpisodesPayload,
  } = useSeasonEpisodes();

  function changeSortOption(sortOrder: SortOrder) {
    if (sortOrder !== currentSortOrder)
      setSeasonEpisodesPayload((prev) => ({
        ...prev,
        pageNumber: 1,
        currentSortOrder: sortOrder,
      }));

    if (toogleDropdown) toogleDropdown();
  }

  return (
    <>
      <button
        className="menu-item"
        data-active={currentSortOrder === "Oldest"}
        onClick={changeSortOption.bind(null, "Oldest")}
      >
        Oldest
      </button>

      <button
        className="menu-item"
        data-active={currentSortOrder === "Newest"}
        onClick={changeSortOption.bind(null, "Newest")}
      >
        Newest
      </button>
    </>
  );
};

export default SortList;
