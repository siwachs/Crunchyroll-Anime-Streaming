import { notFound } from "next/navigation";

import connectToDb from "../connectToDb";
import { ObjectId } from "mongodb";
import { getMetaTags, getSeasons, getEpisodes } from "../pipelineStages";

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

// Need More Memory But Simpler Pipeline
export async function getEpisodeWithMongoDBDataPipeline(
  id: string,
): Promise<Episode> {
  const { db } = await connectToDb();

  const episodesArray = await db
    .collection(EPISODES)
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      ...getMetaTags(),
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
            ...getMetaTags(),
            ...getSeasons("season"),
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
          media: { $first: "$media" },
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
          media: 1,
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
                season: {
                  $first: "$prevEpisode.populatedSeasons.season",
                },
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
                season: {
                  $first: "$nextEpisode.populatedSeasons.season",
                },
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

// Less Memory But Complex Pipeline
export default async function getEpisode(id: string): Promise<Episode> {
  const { db } = await connectToDb();

  const episodesArray = await db
    .collection(EPISODES)
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      ...getMetaTags(),
      ...getSeasons("season"),
      { $set: { season: { $first: "$populatedSeasons" } } },
      ...getEpisodes("season.episodes"),
      {
        $set: {
          currentSeasonEpisodes: {
            $sortArray: {
              input: "$populatedEpisodes",
              sortBy: { releaseDate: 1 },
            },
          },
        },
      },
      {
        $set: {
          currentEpisodeIndex: {
            $indexOfArray: ["$currentSeasonEpisodes._id", "$_id"],
          },
        },
      },
      {
        $set: {
          prevEpisode: {
            $cond: {
              if: { $gte: ["$currentEpisodeIndex", 1] },
              then: {
                $arrayElemAt: [
                  "$currentSeasonEpisodes",
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
                  { $subtract: [{ $size: "$currentSeasonEpisodes" }, 1] },
                ],
              },
              then: {
                $arrayElemAt: [
                  "$currentSeasonEpisodes",
                  { $add: ["$currentEpisodeIndex", 1] },
                ],
              },
              else: null,
            },
          },
        },
      },
      ...getMetaTags(
        "prevEpisode.metaTags",
        "_id",
        "prevEpisodePopulatedMetaTags",
      ),
      ...getSeasons("prevEpisode.season", "_id", "prevEpisodeSeason"),
      ...getMetaTags(
        "nextEpisode.metaTags",
        "_id",
        "nextEpisodePopulatedMetaTags",
      ),
      ...getSeasons("nextEpisode.season", "_id", "nextEpisodeSeason"),
      {
        $set: {
          prevEpisodeSeason: { $first: "$prevEpisodeSeason.season" },
          nextEpisodeSeason: { $first: "$nextEpisodeSeason.season" },
        },
      },
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
            seasons: { $first: "$populatedSeries.seasons" },
          },
        },
      },
      {
        $project: {
          prevEpisodeSeason: 1,
          nextEpisdoeSeason: 1,
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
          media: 1,
          season: {
            id: { $toString: "$season._id" },
            episodes: "$season.episodes",
          },
          prevEpisode: {
            $cond: {
              if: { $ne: ["$prevEpisode", null] },
              then: {
                id: { $toString: "$prevEpisode._id" },
                episode: "$prevEpisode.episode",
                title: "$prevEpisode.title",
                thumbnail: "$prevEpisode.thumbnail",
                duration: "$prevEpisode.duration",
                metaTags: "$prevEpisodePopulatedMetaTags.title",
                season: "$prevEpisodeSeason",
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
                metaTags: "$nextEpisodePopulatedMetaTags.title",
                season: "$nextEpisodeSeason",
              },
              else: null,
            },
          },
          series: 1,
        },
      },
    ])
    .toArray();

  const rawEpisode = episodesArray[0];
  const {
    series: { seasons },
    season,
  } = rawEpisode;

  const { prevEpisode, nextEpisode } = rawEpisode;
  const currentSeasonIndex = seasons.findIndex(
    (s: ObjectId) => s.toString() === season.id,
  );

  async function getEpisodeCard(seasonId: ObjectId, episode: "prev" | "next") {
    const episodesArray = await db
      .collection(SEASONS)
      .aggregate([
        { $match: { _id: new ObjectId(seasonId) } },
        ...getEpisodes("episodes"),
        {
          $set: {
            populatedEpisodes: {
              $sortArray: {
                input: "$populatedEpisodes",
                sortBy: { releaseDate: 1 },
              },
            },
          },
        },
        {
          $set: {
            targetEpisode: {
              $cond: {
                if: { $eq: [episode, "prev"] },
                then: {
                  $arrayElemAt: [
                    "$populatedEpisodes",
                    { $subtract: [{ $size: "$populatedEpisodes" }, 1] },
                  ],
                },
                else: { $arrayElemAt: ["$populatedEpisodes", 0] },
              },
            },
          },
        },
        ...getMetaTags("targetEpisode.metaTags"),
        ...getSeasons("targetEpisode.season"),
        { $set: { season: { $first: "$populatedSeasons.season" } } },
        {
          $project: {
            _id: 0,
            id: { $toString: "$targetEpisode._id" },
            episode: "$targetEpisode.episode",
            title: "$targetEpisode.title",
            thumbnail: "$targetEpisode.thumbnail",
            duration: "$targetEpisode.duration",
            metaTags: "$populatedMetaTags.title",
            season: 1,
          },
        },
      ])
      .toArray();

    return episodesArray[0];
  }

  if (currentSeasonIndex > 0 && prevEpisode === null) {
    const prevSeason = seasons[currentSeasonIndex - 1];
    rawEpisode.prevEpisode = await getEpisodeCard(prevSeason, "prev");
  }

  if (currentSeasonIndex < seasons.length - 1 && nextEpisode === null) {
    const nextSeason = seasons[currentSeasonIndex + 1];
    rawEpisode.nextEpisode = await getEpisodeCard(nextSeason, "next");
  }

  delete rawEpisode.season;
  delete rawEpisode.series.seasons;

  return rawEpisode as Episode;
}
