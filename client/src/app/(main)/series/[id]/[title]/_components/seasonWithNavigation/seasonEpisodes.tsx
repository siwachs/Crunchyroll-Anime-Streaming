import { useSeasonEpisodes } from "@/providers/seasonEpisodesProvider";

import PlayableCard, { PlayableCardSkeleton } from "@/components/playableCard";
import ActionButton from "@/components/contentActionButtons/actionButton";

const SeasonEpisodes: React.FC<{
  title: string;
}> = ({ title }) => {
  const {
    getEpisodesPayload,
    seasonEpisodesPayload,
    setSeasonEpisodesPayload,
    seriesId,
    currentSeason,
  } = useSeasonEpisodes();
  const {
    seasonEpisodesLoading,
    seasonEpisodesShowMoreLoading,
    episodes,
    totalEpisodes,
  } = seasonEpisodesPayload;

  async function showMore() {
    setSeasonEpisodesPayload((prev) => ({
      ...prev,
      seasonEpisodesShowMoreLoading: true,
    }));

    await getEpisodesPayload({ showAll: true });

    setSeasonEpisodesPayload((prev) => ({
      ...prev,
      seasonEpisodesShowMoreLoading: false,
    }));
  }

  return (
    <div className="season-episodes-list">
      <div className="3xl:grid-cols-7 mb-3 grid grid-cols-1 gap-3 sm:mb-5 sm:grid-cols-2 sm:gap-5 md:mb-7.5 md:grid-cols-3 md:gap-7.5 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {seasonEpisodesLoading
          ? [...new Array(3)].map((_, index) => (
              <PlayableCardSkeleton key={index} />
            ))
          : episodes.map((episode) => (
              <PlayableCard
                key={episode.id}
                seriesId={seriesId}
                title={title}
                currentSeason={currentSeason}
                episode={episode}
              />
            ))}
      </div>

      {!seasonEpisodesLoading && episodes.length < totalEpisodes && (
        <div className="mx-auto max-w-[63.625rem]">
          <ActionButton
            text="Show More"
            className="w-full min-w-20 bg-[#213944] text-white hover:bg-[#2f5161] focus-visible:bg-[#2f5161] disabled:bg-[#213944]"
            disabled={seasonEpisodesShowMoreLoading}
            onClick={showMore}
          />
        </div>
      )}
    </div>
  );
};

export default SeasonEpisodes;
