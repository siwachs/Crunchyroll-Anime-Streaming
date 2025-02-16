import { notFound } from "next/navigation";

import connectToDb from "../connectToDb";
import { ObjectId } from "mongodb";
import {
  metaTags,
  genres,
  episodeIdAndTitle,
  seasons,
} from "../pipelineStages";

import { Series } from "@/app/(main)/series/[id]/[title]/page.types";
import { SERIES } from "../collectionNames";

export async function getTitle(id: string): Promise<string> {
  const { db } = await connectToDb();

  const series = await db
    .collection(SERIES)
    .findOne({ _id: new ObjectId(id) }, { projection: { title: 1, _id: 0 } });

  if (!series?.title) throw notFound();

  return series.title;
}

export default async function getSeries(id: string): Promise<Series> {
  const { db } = await connectToDb();

  const seriesArray = await db
    .collection(SERIES)
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      ...metaTags,
      ...genres,
      ...seasons,
      ...episodeIdAndTitle,
      {
        $project: {
          _id: 0,
          poster: { tall: 1, wide: 1 },
          title: 1,
          metaTags: "$populatedMetaTags.title",
          genres: "$populatedGenres.title",
          averageRating: 1,
          totalRating: 1,
          description: 1,
          details: 1,
          licence: 1,
          seasons: {
            $map: {
              input: "$populatedSeasons",
              as: "season",
              in: {
                id: { $toString: "$$season._id" },
                season: "$$season.season",
                title: "$$season.title",
                totalEpisodes: { $size: "$$season.episodes" },
              },
            },
          },
          episodeId: { $toString: "$episodeId" },
          episodeTitle: 1,
        },
      },
    ])
    .toArray();

  const series = seriesArray[0];

  return series as Series;
}
