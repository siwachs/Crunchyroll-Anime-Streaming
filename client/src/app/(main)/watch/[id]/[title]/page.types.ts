export type Episode = {
  episode: string;
  title: string;
  thumbnail: string;
  duration: string | number;
  metaTags: string[];
  releaseDate: string;
  likes: number;
  dislikes: number;
  description: string;
  details: Record<string, string>;
  series: {
    id: string;
    title: string;
    averageRating: number;
    totalRating: number;
  };
};
