import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

import connectToDb from "../connectToDb";
import {
  genres,
  metaTagsWithoutNumericTypeTags,
  episodeIdAndTitle,
  getSeasons,
} from "../pipelineStages";

import { BannerItem } from "@/app/(main)/_components/banner/index.types";
import { DataFeedItem } from "@/app/(main)/_components/dataFeedRow/index.types";

import {
  ASIA_COUNTRIES,
  MIDDLE_EAST_COUNTRIES,
  WEST_COUNTRIES,
} from "@/constants/countriesCodes";
import {
  BANNER_LIST_SIZE,
  TOP_PICKS_FOR_YOU_SIZE,
  NEWLY_UPDATED_SERIES_SIZE,
} from "@/constants";
import { SERIES } from "../collectionNames";

function getContinent(clientGeoCountry: string) {
  if (ASIA_COUNTRIES.includes(clientGeoCountry)) return "ASIA";
  else if (MIDDLE_EAST_COUNTRIES.includes(clientGeoCountry))
    return "MIDDLE_EAST";
  else if (WEST_COUNTRIES.includes(clientGeoCountry)) return "WEST";

  return clientGeoCountry;
}

async function getBannerItems(
  size: number = BANNER_LIST_SIZE,
): Promise<BannerItem[]> {
  const headersList = await headers();

  const clientGeoCountry = headersList.get("x-client-geo-country") as string;
  const continent = getContinent(clientGeoCountry);

  const getCachedBanner = unstable_cache(
    async () => {
      const { db } = await connectToDb();

      const bannerItems = await db
        .collection(SERIES)
        .aggregate([
          { $sample: { size } },
          ...metaTagsWithoutNumericTypeTags,
          ...genres,
          ...episodeIdAndTitle,
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

      return bannerItems;
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

async function getTopPicksForYou(
  size: number = TOP_PICKS_FOR_YOU_SIZE,
): Promise<DataFeedItem[]> {
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
          ...metaTagsWithoutNumericTypeTags,
          ...episodeIdAndTitle,
          ...getSeasons(),
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
      revalidate: 23 * 60, // Revalidate every 23 minutes
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

async function getNewlyUpdatedSeries(
  limit: number = NEWLY_UPDATED_SERIES_SIZE,
): Promise<DataFeedItem[]> {
  const getCachedNewlyUpdatedSeries = unstable_cache(async () => {
    const { db } = await connectToDb();

    return await db
      .collection(SERIES)
      .aggregate([
        { $sort: { seriesUpdatedOn: -1 } },
        { $limit: limit },
        ...metaTagsWithoutNumericTypeTags,
        ...episodeIdAndTitle,
        ...getSeasons(),
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
  }, ["newly-updated-series"]);

  const cachedTNewlyUpdatedSeriesArray = await getCachedNewlyUpdatedSeries();
  return cachedTNewlyUpdatedSeriesArray.map((newlyUpdatedSeriesItem) => {
    const { _id, episodeId, ...restOfTopPickItem } = newlyUpdatedSeriesItem;

    return {
      id: _id.toString(),
      episodeId: episodeId.toString(),
      ...restOfTopPickItem,
    } as DataFeedItem;
  });
}

export { getBannerItems, getTopPicksForYou, getNewlyUpdatedSeries };
