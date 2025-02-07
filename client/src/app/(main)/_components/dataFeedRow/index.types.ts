export type DataFeedItem = {
  id: string;
  title: string;
  poster: { raw: string };
  metaTags: string[];
  averageRating: number;
  totalRating: number;
  description: string;
  totalSeasons: number;
  totalEpisodes: number;
  episodeId: string;
  episodeTitle: string;
};
