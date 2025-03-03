import type { Metadata, ResolvingMetadata } from "next";

import { VideoPlayerProvider } from "@/providers/videoPlayer";

import VideoPlayer from "./_components/videoPlayer";
import MediaDetails from "./_components/currentMedia";
import Videos from "./_components/videos";

import getEpisode, { getTitle } from "@/lib/mongodb/CRUD/getEpisode";

import "./page.css";

type PageProps = { params: Promise<{ id: string; title: string }> };

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).id;

  const title = await getTitle(id);

  return {
    title: `${title.seriesTitle} ${title.episodeTitle} - Watch on Crunchyroll`,
  };
}

export default async function Watch({ params }: Readonly<PageProps>) {
  const { id } = await params;
  const episode = await getEpisode(id);
  const { series } = episode;

  return (
    <>
      <main>
        <VideoPlayerProvider media={episode.media}>
          <VideoPlayer duration={episode.duration} />
        </VideoPlayerProvider>

        <div className="content-wrapper">
          <div className="content-wrapper-body 2sm:pt-8 grid grid-cols-[minmax(min-content,54.375rem)_auto] justify-center pt-6">
            <MediaDetails
              seriesId={series.id}
              seriesTitle={series.title}
              averageRating={series.averageRating}
              totalRating={series.totalRating}
              title={episode.title}
              metaTags={episode.metaTags}
              releaseDate={episode.releaseDate}
              likes={episode.likes}
              dislikes={episode.dislikes}
              description={episode.description}
              details={episode.details}
            />

            <Videos
              prevEpisode={episode.prevEpisode}
              nextEpisode={episode.nextEpisode}
            />
          </div>
        </div>
      </main>

      <footer></footer>
    </>
  );
}
