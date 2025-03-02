import type { Metadata, ResolvingMetadata } from "next";

import { SeasonEpisodesProvider } from "@/providers/seaonEpisodes";

import Banner from "./_components/banner";
import Details from "./_components/details";
import SeasonWithNavigation from "./_components/seasonWithNavigation";

import getSeries, { getTitle } from "@/lib/mongodb/CRUD/getSeries";

type PageProps = { params: Promise<{ id: string; title: string }> };

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).id;

  const title = await getTitle(id);

  return { title: `Watch ${title} - Crunchyroll` };
}

export default async function Series({ params }: Readonly<PageProps>) {
  const { id } = await params;
  const series = await getSeries(id);

  return (
    <>
      <main>
        <div className="relative grid grid-cols-1 gap-10 pb-10 sm:gap-15 sm:pb-15">
          <Banner
            seriesId={id}
            poster={series.poster}
            title={series.title}
            metaTags={series.metaTags}
            genres={series.genres}
            averageRating={series.averageRating}
            totalRating={series.totalRating}
            totalSeasons={series.seasons.length}
            episodeId={series.episodeId}
            episodeTitle={series.episodeTitle}
          />

          <Details
            description={series.description}
            details={series.details}
            genres={series.genres}
            licence={series.licence}
          />

          <SeasonEpisodesProvider seriesId={id} seasons={series.seasons}>
            <SeasonWithNavigation title={series.title} />
          </SeasonEpisodesProvider>
        </div>
      </main>

      <footer></footer>
    </>
  );
}
