import { notFound } from "next/navigation";

import connectToDb from "../connectToDb";
import { ObjectId } from "mongodb";
import { metaTags } from "../pipelineStages";

import { Episode } from "@/app/(main)/watch/[id]/[title]/page.types";
import { SERIES, SEASONS, EPISODES } from "../collectionNames";

export async function getTitle(
  id: string,
): Promise<{ seriesTitle: string; episodeTitle: string }> {
  const { db } = await connectToDb();

  const episodesArray = await db
    .collection(EPISODES)
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: SERIES,
          localField: "series",
          foreignField: "_id",
          as: "populatedSeries",
        },
      },
      {
        $set: {
          series: {
            title: { $first: "$populatedSeries.title" },
          },
        },
      },
      { $project: { _id: 0, title: 1, series: 1 } },
    ])
    .toArray();
  const episode = episodesArray[0];
  if (!episode) throw notFound();

  return { seriesTitle: episode.series.title, episodeTitle: episode.title };
}

export default async function getEpisode(id: string): Promise<Episode> {
  const { db } = await connectToDb();

  const episodesArray = await db
    .collection(EPISODES)
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      ...metaTags,
      {
        $lookup: {
          from: SERIES,
          localField: "series",
          foreignField: "_id",
          as: "populatedSeries",
        },
      },
      {
        $set: {
          series: {
            id: { $toString: { $first: "$populatedSeries._id" } },
            title: { $first: "$populatedSeries.title" },
            averageRating: { $first: "$populatedSeries.averageRating" },
            totalRating: { $first: "$populatedSeries.totalRating" },
          },
          seasons: { $first: "$populatedSeries.seasons" },
        },
      },
      {
        $lookup: {
          from: SEASONS,
          localField: "seasons",
          foreignField: "_id",
          as: "populatedSeasons",
        },
      },
      {
        $project: {
          _id: 0,
          episode: 1,
          title: 1,
          thumbnail: 1,
          duration: 1,
          metaTags: "$populatedMetaTags.title",
          releaseDate: 1,
          likes: 1,
          dislikes: 1,
          description: 1,
          details: 1,
          series: 1,
        },
      },
    ])
    .toArray();

  const episode = episodesArray[0];

  return episode as Episode;
}
