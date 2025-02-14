import PlayableCard from "@/components/playableCard";

import { Season } from "@/types";
import { SeasonEpisodesPayload } from "../../page.types";

const SeasonEpisodes: React.FC<{
  seriesId: string;
  title: string;
  currentSeason: Season;
  seasonEpisodesPayload: SeasonEpisodesPayload;
}> = ({ seriesId, title, currentSeason, seasonEpisodesPayload }) => {
  const { episodes } = seasonEpisodesPayload;

  return (
    <div className="season-episodes-list mb-3">
      <div className="3xl:grid-cols-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 md:gap-7.5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {episodes.map((episode) => (
          <PlayableCard
            key={episode.id}
            seriesId={seriesId}
            title={title}
            currentSeason={currentSeason}
            episode={episode}
          />
        ))}
      </div>
    </div>
  );
};

export default SeasonEpisodes;
