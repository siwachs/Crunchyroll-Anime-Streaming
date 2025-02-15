"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";

import { Context, Season, SortOption, SeasonEpisodesPayload } from "./types";

import { SEASON_EPISODES_PAGE_SIZE } from "@/constants";

const SeasonEpisodesContext = createContext<Context | undefined>(undefined);

export function useSeasonEpisodes() {
  const context = useContext(SeasonEpisodesContext);
  if (!context)
    throw new Error(
      "useSeasonEpisodes must be used within SeasonEpisodesProvider",
    );

  return context;
}

export function SeasonEpisodesProvider({
  children,
  seasons,
  seriesId,
}: Readonly<{
  children: React.ReactNode;
  seasons: Season[];
  seriesId: string;
}>) {
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
  }, [currentSeason.id, seasonEpisodesPayload.pageNumber, currentSeason]);

  const value = useMemo(
    () => ({
      seasons,
      currentSeason,
      setCurrentSeason,
      currentSortOption,
      setCurrentSortOption,
      seasonEpisodesPayload,
      setSeasonEpisodesPayload,
    }),
    [currentSeason, currentSortOption, seasonEpisodesPayload],
  );

  return (
    <SeasonEpisodesContext.Provider value={value}>
      {children}
    </SeasonEpisodesContext.Provider>
  );
}
