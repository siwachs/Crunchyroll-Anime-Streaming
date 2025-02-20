import { useSeasonEpisodes } from "@/providers/seasonEpisodesProvider";

import { getTitleWithSeasonNumber } from "@/lib/utils";

import { Season } from "@/providers/seasonEpisodesProvider.types";

const SeasonList: React.FC<{
  toogleDropdown?: () => void;
}> = ({ toogleDropdown }) => {
  const { seasons, currentSeason, setCurrentSeason } = useSeasonEpisodes();

  function changeSeason(season: Season) {
    setCurrentSeason(season);

    if (toogleDropdown) toogleDropdown();
  }

  return seasons.map((season) => (
    <button
      key={season.id}
      className="menu-item"
      data-active={season.id === currentSeason.id}
      onClick={changeSeason.bind(null, season)}
    >
      <span className="inline-block max-w-full truncate sm:text-base">
        {getTitleWithSeasonNumber(season.season, season.title)}
      </span>
      <span className="flex-[0_0_auto] text-xs font-semibold">
        {`${season.totalEpisodes} ${season.totalEpisodes <= 1 ? "Episode" : "Episodes"}`}
      </span>
    </button>
  ));
};

export default SeasonList;
