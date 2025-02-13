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
      <div className="grid grid-cols-1 gap-3">
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
