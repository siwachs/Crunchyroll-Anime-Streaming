import { Season } from "@/types";

export type Series = {
  poster: { tall: string; wide: string };
  title: string;
  metaTags: string[];
  genres: string[];
  averageRating: number;
  totalRating: number;
  description: string;
  details: Record<string, string>;
  licence: string;
  seasons: Season[];
  episodeId: string;
  episodeTitle: string;
};
