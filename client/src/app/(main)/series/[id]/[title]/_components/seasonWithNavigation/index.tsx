"use client";

import { useEffect, useState } from "react";

import TopControls from "./topControls";
import SeasonEpisodes from "./seasonEpisodes";

import { SortOption, SeasonEpisodesPayload } from "../../page.types";
import { Season } from "@/types";

import { SEASON_EPISODES_PAGE_SIZE } from "@/constants";

const SeasonWithNavigation: React.FC<{
  seriesId: string;
  title: string;
  seasons: Season[];
}> = ({ seriesId, title, seasons }) => {
  const [currentSeason, setCurrentSeason] = useState<Season>(seasons[0]);
  const [currentSortOption, setCurrentSortOption] =
    useState<SortOption>("Oldest");

  const [seasonEpisodesPayload, setSeasonEpisodesPayload] =
    useState<SeasonEpisodesPayload>({
      episodes: [],
      pageNumber: 1,
      totalEpisodes: 0,
      pageSize: SEASON_EPISODES_PAGE_SIZE,
      totalPages: 1,
    });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchEpisodesPayload() {
      try {
        const fetchEpisodesPayloadResponse = await fetch(
          `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${seriesId}/${currentSeason.id}?pageNumber=${seasonEpisodesPayload.pageNumber}`,
          { signal },
        );

        if (fetchEpisodesPayloadResponse.ok) {
          const parsedEpisodesPayloadResonse =
            await fetchEpisodesPayloadResponse.json();
          setSeasonEpisodesPayload(parsedEpisodesPayloadResonse);
        }
      } catch (error) {
        console.error((error as Error).message);
      }
    }

    fetchEpisodesPayload();

    return () => controller.abort();
  }, [currentSeason.id, seasonEpisodesPayload.pageNumber]);

  return (
    <div className="container-cmp">
      <div className="season-with-navigation">
        <TopControls
          seasons={seasons}
          currentSeason={currentSeason}
          setCurrentSeason={setCurrentSeason}
          currentSortOption={currentSortOption}
          setCurrentSortOption={setCurrentSortOption}
        />

        <SeasonEpisodes
          seriesId={seriesId}
          title={title}
          currentSeason={currentSeason}
          seasonEpisodesPayload={seasonEpisodesPayload}
        />
      </div>
    </div>
  );
};

export default SeasonWithNavigation;
