import CreateSeriesForm from "./_components/createSeriesForm";

import { connectToDb } from "@/lib/mongoDB";

export default async function CreateSeries() {
  const { db } = await connectToDb();

  const genresArray = await db.collection("Genres").find({}).toArray();
  const metaTagsArray = await db.collection("MetaTags").find({}).toArray();

  const genres = genresArray.map((genre) => {
    const { _id, ...restOfgenre } = genre;

    return { id: _id.toString(), ...restOfgenre };
  });
  const metaTags = metaTagsArray.map((metaTag) => {
    const { _id, ...restOfMetaTag } = metaTag;

    return { id: _id.toString(), ...restOfMetaTag };
  });

  return (
    <div className="my-6">
      <CreateSeriesForm />
    </div>
  );
}
