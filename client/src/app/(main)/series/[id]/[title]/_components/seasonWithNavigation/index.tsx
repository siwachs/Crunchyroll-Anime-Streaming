"use client";

import TopControls from "./topControls";
import SeasonEpisodes from "./seasonEpisodes";

const SeasonWithNavigation: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div className="container-cmp">
      <div className="season-with-navigation">
        <TopControls />

        {/* <SeasonEpisodes
          seriesId={seriesId}
          title={title}
          currentSeason={currentSeason}
          seasonEpisodesPayload={seasonEpisodesPayload}
        /> */}
      </div>
    </div>
  );
};

export default SeasonWithNavigation;
