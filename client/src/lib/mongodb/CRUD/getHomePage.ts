import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

import connectToDb from "../connectToDb";
import {
  getMetaTagsWithoutNumericTypeTags,
  getEpisodeIdAndTitle,
} from "../pipelineStages";

import { BannerItem } from "@/app/(main)/_components/banner/index.types";
import { DataFeedItem } from "@/app/(main)/_components/dataFeedRow/index.types";

import {
  ASIA_COUNTRIES,
  MIDDLE_EAST_COUNTRIES,
  WEST_COUNTRIES,
} from "@/constants/countriesCodes";
import { SERIES } from "../collectionNames";

function getContinent(clientGeoCountry: string) {
  if (ASIA_COUNTRIES.includes(clientGeoCountry)) return "ASIA";
  else if (MIDDLE_EAST_COUNTRIES.includes(clientGeoCountry))
    return "MIDDLE_EAST";
  else if (WEST_COUNTRIES.includes(clientGeoCountry)) return "WEST";

  return clientGeoCountry;
}

async function getBannerItems(size: number = 6): Promise<BannerItem[]> {
  const headersList = await headers();

  const clientGeoCountry = headersList.get("x-client-geo-country") as string;
  const continent = getContinent(clientGeoCountry);

  const getCachedBanner = unstable_cache(
    async () => {
      const { db } = await connectToDb();

      return await db
        .collection(SERIES)
        .aggregate([
          { $sample: { size } },
          ...getMetaTagsWithoutNumericTypeTags(),
          {
            $lookup: {
              from: "Genres",
              localField: "genres",
              foreignField: "_id",
              as: "populatedGenres",
            },
          },
          ...getEpisodeIdAndTitle(),
          {
            $project: {
              title: 1,
              banner: 1,
              metaTags: "$populatedMetaTags.title",
              genres: "$populatedGenres.title",
              description: 1,
              totalSeasons: { $size: "$seasons" },
              episodeId: 1,
              episodeTitle: 1,
            },
          },
        ])
        .toArray();
    },
    ["banner", continent],
    {
      revalidate: 7 * 24 * 60 * 60, // Revalidate every 7 days
    },
  );

  const cachedBannerArray = await getCachedBanner();
  return cachedBannerArray.map((bannerItem) => {
    const { _id, episodeId, ...restOfBannerItem } = bannerItem;

    return {
      id: _id.toString(),
      episodeId: episodeId.toString(),
      ...restOfBannerItem,
    } as BannerItem;
  });
}

async function getTopPicksForYou(size: number = 10): Promise<DataFeedItem[]> {
  const headersList = await headers();

  const clientGeoCountry = headersList.get("x-client-geo-country") as string;
  const continent = getContinent(clientGeoCountry);

  const getCachedTopPicksForYou = unstable_cache(
    async () => {
      const { db } = await connectToDb();

      return await db
        .collection(SERIES)
        .aggregate([
          { $sample: { size } },
          ...getMetaTagsWithoutNumericTypeTags(),
          ...getEpisodeIdAndTitle(),
          {
            $project: {
              title: 1,
              "poster.raw": 1,
              metaTags: "$populatedMetaTags.title",
              averageRating: 1,
              totalRating: 1,
              description: 1,
              totalSeasons: { $size: "$seasons" },
              totalEpisodes: {
                $sum: {
                  $map: {
                    input: "$populatedSeasons",
                    as: "season",
                    in: { $size: "$$season.episodes" },
                  },
                },
              },
              episodeId: 1,
              episodeTitle: 1,
            },
          },
        ])
        .toArray();
    },
    ["top-picks-for-you", continent],
    {
      revalidate: 8 * 60, // Revalidate every 8 minutes
    },
  );

  const cachedTopPicksForYouArray = await getCachedTopPicksForYou();
  return cachedTopPicksForYouArray.map((topPicksItem) => {
    const { _id, episodeId, ...restOfTopPickItem } = topPicksItem;

    return {
      id: _id.toString(),
      episodeId: episodeId.toString(),
      ...restOfTopPickItem,
    } as DataFeedItem;
  });
}

async function getNewlyAddedSeries(
  limit: number = 21,
): Promise<DataFeedItem[]> {
  const getCachedNewlyAddedSeries = unstable_cache(async () => {
    const { db } = await connectToDb();

    return await db
      .collection(SERIES)
      .aggregate([
        { $sort: { seriesUpdatedOn: -1 } },
        { $limit: limit },
        ...getMetaTagsWithoutNumericTypeTags(),
        ...getEpisodeIdAndTitle(),
        {
          $project: {
            title: 1,
            "poster.raw": 1,
            metaTags: "$populatedMetaTags.title",
            averageRating: 1,
            totalRating: 1,
            description: 1,
            totalSeasons: { $size: "$seasons" },
            totalEpisodes: {
              $sum: {
                $map: {
                  input: "$populatedSeasons",
                  as: "season",
                  in: { $size: "$$season.episodes" },
                },
              },
            },
            episodeId: 1,
            episodeTitle: 1,
          },
        },
      ])
      .toArray();
  }, ["newly-added-series"]);

  const cachedTNewlyAddedSeriesArray = await getCachedNewlyAddedSeries();
  return cachedTNewlyAddedSeriesArray.map((newlyAddedSeriesItem) => {
    const { _id, episodeId, ...restOfTopPickItem } = newlyAddedSeriesItem;

    return {
      id: _id.toString(),
      episodeId: episodeId.toString(),
      ...restOfTopPickItem,
    } as DataFeedItem;
  });
}

export { getBannerItems, getTopPicksForYou, getNewlyAddedSeries };
