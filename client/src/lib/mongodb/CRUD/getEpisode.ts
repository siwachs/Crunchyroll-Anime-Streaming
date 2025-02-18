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
      { $unwind: "$populatedSeasons" },
      {
        $lookup: {
          from: EPISODES,
          let: { seasonEpisodeIds: "$populatedSeasons.episodes" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$seasonEpisodeIds"] } } },
            ...metaTags,
            { $sort: { releaseDate: 1 } },
          ],
          as: "populatedSeasons.populatedEpisodes",
        },
      },
      {
        $group: {
          _id: "$_id",
          episode: { $first: "$episode" },
          title: { $first: "$title" },
          thumbnail: { $first: "$thumbnail" },
          duration: { $first: "$duration" },
          metaTags: { $first: "$populatedMetaTags.title" },
          releaseDate: { $first: "$releaseDate" },
          likes: { $first: "$likes" },
          dislikes: { $first: "$dislikes" },
          description: { $first: "$description" },
          details: { $first: "$details" },
          series: { $first: "$series" },
          populatedSeasons: { $push: "$populatedSeasons" },
        },
      },
      {
        $set: {
          allEpisodes: {
            $reduce: {
              input: "$populatedSeasons",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this.populatedEpisodes"] },
            },
          },
        },
      },
      {
        $set: {
          currentEpisodeIndex: {
            $indexOfArray: ["$allEpisodes._id", new ObjectId(id)],
          },
        },
      },
      {
        $set: {
          prevEpisode: {
            $cond: {
              if: { $gt: ["$currentEpisodeIndex", 0] },
              then: {
                $arrayElemAt: [
                  "$allEpisodes",
                  { $subtract: ["$currentEpisodeIndex", 1] },
                ],
              },
              else: null,
            },
          },
          nextEpisode: {
            $cond: {
              if: {
                $lt: [
                  "$currentEpisodeIndex",
                  { $subtract: [{ $size: "$allEpisodes" }, 1] },
                ],
              },
              then: {
                $arrayElemAt: [
                  "$allEpisodes",
                  { $add: ["$currentEpisodeIndex", 1] },
                ],
              },
              else: null,
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          episode: 1,
          title: 1,
          thumbnail: 1,
          duration: 1,
          metaTags: 1,
          releaseDate: 1,
          likes: 1,
          dislikes: 1,
          description: 1,
          details: 1,
          series: 1,
          prevEpisode: {
            $cond: {
              if: { $ne: ["$prevEpisode", null] },
              then: {
                id: { $toString: "$prevEpisode._id" },
                episode: "$prevEpisode.episode",
                title: "$prevEpisode.title",
                thumbnail: "$prevEpisode.thumbnail",
                duration: "$prevEpisode.duration",
                metaTags: "$prevEpisode.populatedMetaTags.title",
              },
              else: null,
            },
          },
          nextEpisode: {
            $cond: {
              if: { $ne: ["$nextEpisode", null] },
              then: {
                id: { $toString: "$nextEpisode._id" },
                episode: "$nextEpisode.episode",
                title: "$nextEpisode.title",
                thumbnail: "$nextEpisode.thumbnail",
                duration: "$nextEpisode.duration",
                metaTags: "$nextEpisode.populatedMetaTags.title",
              },
              else: null,
            },
          },
        },
      },
    ])
    .toArray();

  const episode = episodesArray[0];

  return episode as Episode;
}
