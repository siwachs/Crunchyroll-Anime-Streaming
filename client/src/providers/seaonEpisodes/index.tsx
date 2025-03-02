"use client";

import { useState, useEffect, useMemo, createContext, useContext } from "react";

import { Context, Season, SeasonEpisodesPayload } from "./index.types";

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
  seriesId,
  seasons,
}: Readonly<{
  children: React.ReactNode;
  seriesId: string;
  seasons: Season[];
}>) {
  const [currentSeason, setCurrentSeason] = useState<Season>(seasons[0]);

  const [seasonEpisodesPayload, setSeasonEpisodesPayload] =
    useState<SeasonEpisodesPayload>({
      seasonEpisodesLoading: true,
      episodes: [],
      currentSortOrder: "Oldest",
      pageNumber: 1,
      totalEpisodes: 0,
      pageSize: SEASON_EPISODES_PAGE_SIZE,
      totalPages: 0,
    });

  async function getEpisodesPayload(options?: {
    signal?: AbortSignal;
    showAll?: boolean;
  }) {
    const { signal = undefined, showAll = false } = options || {};

    try {
      const baseURL = `/api/${process.env.NEXT_PUBLIC_API_VERSION}/${seriesId}/${currentSeason.id}/episodes`;
      const queryParams = new URLSearchParams({
        pageNumber: seasonEpisodesPayload.pageNumber.toString(),
        pageSize: seasonEpisodesPayload.pageSize.toString(),
        sortOrder: seasonEpisodesPayload.currentSortOrder,
        showAll: showAll.toString(),
      });
      const fetchEpisodesPaloadURL = `${baseURL}?${queryParams.toString()}`;

      const fetchEpisodesPayloadResponse = await fetch(fetchEpisodesPaloadURL, {
        signal,
      });

      if (fetchEpisodesPayloadResponse.ok) {
        const parsedEpisodesPayloadResponse =
          await fetchEpisodesPayloadResponse.json();
        setSeasonEpisodesPayload(parsedEpisodesPayloadResponse);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function getInitialEpisodesPayload() {
      setSeasonEpisodesPayload((prev) => ({
        ...prev,
        seasonEpisodesLoading: true,
      }));

      await getEpisodesPayload({ signal });

      setSeasonEpisodesPayload((prev) => ({
        ...prev,
        seasonEpisodesLoading: false,
      }));
    }

    getInitialEpisodesPayload();

    return () => controller.abort();
  }, [seriesId, currentSeason.id, seasonEpisodesPayload.currentSortOrder]);

  const value = useMemo(
    () => ({
      getEpisodesPayload,
      seriesId,
      seasons,
      currentSeason,
      setCurrentSeason,
      seasonEpisodesPayload,
      setSeasonEpisodesPayload,
    }),
    [seriesId, seasons, currentSeason, seasonEpisodesPayload],
  );

  return (
    <SeasonEpisodesContext.Provider value={value}>
      {children}
    </SeasonEpisodesContext.Provider>
  );
}
