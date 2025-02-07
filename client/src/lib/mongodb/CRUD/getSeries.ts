import { notFound } from "next/navigation";

import connectToDb from "../connectToDb";
import { ObjectId } from "mongodb";
import { metaTags, genres } from "../pipelineStages";

import { Series } from "@/app/(main)/series/[id]/[title]/page.types";
import { SERIES } from "../collectionNames";

export default async function getSeries(id: string): Promise<Series> {
  const { db } = await connectToDb();

  const seriesArray = await db
    .collection(SERIES)
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      ...metaTags,
      ...genres,
      {
        $project: {
          poster: { tall: 1, wide: 1 },
          title: 1,
          metaTags: "$populatedMetaTags.title",
          genres: "$populatedGenres.title",
          averageRating: 1,
          totalRating: 1,
        },
      },
    ])
    .toArray();

  const series = seriesArray[0];

  if (!series) throw notFound();

  const { _id, ...restOfSeries } = series;

  return {
    ...restOfSeries,
  } as Series;
}
