import { Dispatch, SetStateAction } from "react";

export type SortOrder = "Oldest" | "Newest";

export type Season = {
  id: string;
  season: number;
  title: string;
  totalEpisodes: number;
};

export type Episode = {
  id: string;
  episode: string;
  title: string;
  thumbnail: string;
  duration: number;
  metaTags: string[];
  releaseDate: string;
  description: string;
};

export type SeasonEpisodesPayload = {
  seasonEpisodesLoading?: boolean;
  seasonEpisodesShowMoreLoading?: boolean;
  episodes: Episode[];
  currentSortOrder: SortOrder;
  totalEpisodes: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

export type Context = {
  getEpisodesPayload: (options?: {
    signal?: AbortSignal;
    showAll?: boolean;
  }) => Promise<void>;
  seriesId: string;
  seasons: Season[];
  currentSeason: Season;
  setCurrentSeason: Dispatch<SetStateAction<Season>>;
  seasonEpisodesPayload: SeasonEpisodesPayload;
  setSeasonEpisodesPayload: Dispatch<SetStateAction<SeasonEpisodesPayload>>;
};
