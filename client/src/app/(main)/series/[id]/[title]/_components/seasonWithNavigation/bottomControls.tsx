import { useSeasonEpisodes } from "@/providers/seaonEpisodes";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BottomControls: React.FC = () => {
  const { seasons, currentSeason, setCurrentSeason } = useSeasonEpisodes();
  const currentSeasonIndex = seasons.findIndex(
    (season) => season.id === currentSeason.id,
  );

  function changeSeason(season: "prev" | "next") {
    setCurrentSeason(() =>
      season === "prev"
        ? seasons[currentSeasonIndex - 1]
        : seasons[currentSeasonIndex + 1],
    );
  }

  return (
    <div className="bottom-controls mt-6 sm:mt-9">
      <hr className="m-0 mb-4.75 h-0.5 w-full border-none bg-[var(--app-background-secondary)]" />

      <div className="flex justify-between">
        <button
          className="bottom-controls-pagination-button"
          disabled={currentSeasonIndex <= 0}
          onClick={changeSeason.bind(null, "prev")}
        >
          <FaChevronLeft className="ml-1 size-3.5" />

          <span>
            <span className="sm:initial hidden">Previous season</span>
            <span className="sm:hidden">Previous</span>
          </span>
        </button>

        <button
          className="bottom-controls-pagination-button"
          disabled={currentSeasonIndex >= seasons.length - 1}
          onClick={changeSeason.bind(null, "next")}
        >
          <span>
            <span className="sm:initial hidden">Next season</span>
            <span className="sm:hidden">Next</span>
          </span>

          <FaChevronRight className="mr-1 size-3.5" />
        </button>
      </div>
    </div>
  );
};

export default BottomControls;
