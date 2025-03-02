"use client";

import { useSeasonEpisodes } from "@/providers/seaonEpisodes";

import TopControls from "./topControls";
import SeasonEpisodes from "./seasonEpisodes";
import BottomControls from "./bottomControls";

import "./index.css";

const SeasonWithNavigation: React.FC<{
  title: string;
}> = ({ title }) => {
  const { seasons } = useSeasonEpisodes();

  return (
    <div className="container-cmp">
      <div className="season-with-navigation">
        <TopControls />

        <SeasonEpisodes title={title} />

        {seasons.length > 1 && <BottomControls />}
      </div>
    </div>
  );
};

export default SeasonWithNavigation;
