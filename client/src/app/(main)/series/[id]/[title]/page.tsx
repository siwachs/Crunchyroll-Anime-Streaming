import Banner from "./_components/banner";
import Details from "./_components/details";
import Navigation from "./_components/navigation";

import getSeries from "@/lib/mongodb/CRUD/getSeries";

export default async function Series({
  params,
}: Readonly<{
  params: Promise<{ id: string; title: string }>;
}>) {
  const { id } = await params;
  const series = await getSeries(id);

  return (
    <>
      <main>
        <Banner
          seriesId={id}
          poster={series.poster}
          title={series.title}
          metaTags={series.metaTags}
          genres={series.genres}
          averageRating={4.7}
          totalRating={47300}
        />

        {/* <div className="content-wrapper mb-14 md:mb-0">
          <Details />
          <Navigation />
        </div> */}
      </main>

      <footer></footer>
    </>
  );
}
