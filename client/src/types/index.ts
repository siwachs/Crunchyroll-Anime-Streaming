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
  duration: string;
  metaTags: string[];
  releaseDate: string;
  description: string;
};
