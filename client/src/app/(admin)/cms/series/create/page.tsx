import getMetaTags from "@/lib/mongodb/CRUD/getMetaTags";
import getGenres from "@/lib/mongodb/CRUD/getGenres";

import CreateSeriesForm from "./_components/createSeriesForm";

export default async function CreateSeries() {
  const metaTags = await getMetaTags();
  const genres = await getGenres();

  return (
    <div className="my-6">
      <CreateSeriesForm
        cmsURL={process.env.CMS_SERVER as string}
        metaTags={metaTags}
        genres={genres}
      />
    </div>
  );
}
