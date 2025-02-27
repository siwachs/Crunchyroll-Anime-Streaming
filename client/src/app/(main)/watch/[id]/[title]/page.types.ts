export type EpisodeCardMini = {
  id: string;
  episode: string;
  thumbnail: string;
  duration: number;
  title: string;
  metaTags: string[];
  season?: number;
};

export type Episode = {
  episode: string;
  title: string;
  thumbnail: string;
  duration: number;
  metaTags: string[];
  releaseDate: string;
  likes: number;
  dislikes: number;
  description: string;
  details: Record<string, string>;
  media: string;
  series: {
    id: string;
    title: string;
    averageRating: number;
    totalRating: number;
  };
  prevEpisode: EpisodeCardMini | null;
  nextEpisode: EpisodeCardMini | null;
};
