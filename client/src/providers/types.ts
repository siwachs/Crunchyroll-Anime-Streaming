import { Dispatch, SetStateAction } from "react";

export type Season = {
  id: string;
  season: number;
  title: string;
  totalEpisodes: number;
};

export type SortOption = "Oldest" | "Newest";

export type Episode = {
  id: string;
  episode: string;
  title: string;
  thumbnail: string;
  duration: string;
  metaTags: string[];
  releaseDate: string;
  description: string;
};

export type SeasonEpisodesPayload = {
  episodes: Episode[];
  totalEpisodes: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
};

export type Context = {
  seasons: Season[];
  currentSeason: Season;
  setCurrentSeason: Dispatch<SetStateAction<Season>>;
  currentSortOption: SortOption;
  setCurrentSortOption: Dispatch<SetStateAction<SortOption>>;
  seasonEpisodesPayload: SeasonEpisodesPayload;
  setSeasonEpisodesPayload: Dispatch<SetStateAction<SeasonEpisodesPayload>>;
};
