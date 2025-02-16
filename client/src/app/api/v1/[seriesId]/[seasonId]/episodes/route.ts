import { NextRequest, NextResponse } from "next/server";

import connectToDb from "@/lib/mongodb/connectToDb";
import { ObjectId } from "mongodb";

import { SERIES } from "@/lib/mongodb/collectionNames";
import { SEASON_EPISODES_PAGE_SIZE } from "@/constants";

function getSearchParam(value: string | null, defaultValue = 1) {
  if (value === null) return defaultValue;

  const parsedValue = Number(value);
  if (Number.isInteger(parsedValue) && parsedValue > 0) return parsedValue;

  return defaultValue;
}

const getSeriesSeasonEpisodes = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      seriesId: string;
      seasonId: string;
    }>;
  },
) => {
  try {
    const { seriesId, seasonId } = await params;
    const searchParams = req.nextUrl.searchParams;

    const pageNumber = getSearchParam(searchParams.get("pageNumber"));
    const pageSize = getSearchParam(
      searchParams.get("pageSize"),
      SEASON_EPISODES_PAGE_SIZE,
    );
    const sortOrder =
      searchParams.get("sortOrder") === "Newest" ? "Newest" : "Oldest";
    const showAll = searchParams.get("showAll") === "true" ? "true" : "false";

    const { db } = await connectToDb();

    const pipelineStages = [
      {
        $match: {
          _id: new ObjectId(seriesId),
          seasons: new ObjectId(seasonId),
        },
      },
      {
        $project: {
          seasonId: {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$seasons",
                  as: "season",
                  cond: { $eq: ["$$season", new ObjectId(seasonId)] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $lookup: {
          from: "Seasons",
          localField: "seasonId",
          foreignField: "_id",
          as: "season",
        },
      },
      {
        $lookup: {
          from: "Episodes",
          localField: "season.0.episodes",
          foreignField: "_id",
          as: "season.0.episodes",
        },
      },
      {
        $set: {
          "season.0.episodes": {
            $sortArray: {
              input: "$season.0.episodes",
              sortBy: { releaseDate: sortOrder === "Newest" ? -1 : 1 },
            },
          },
        },
      },
      {
        $set: {
          totalEpisodes: { $size: "$season.0.episodes" },
          "season.0.episodes": {
            $cond: {
              if: { $eq: [showAll, "true"] },
              then: "$season.0.episodes",
              else: {
                $slice: [
                  "$season.0.episodes",
                  (pageNumber - 1) * pageSize,
                  pageSize,
                ],
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "MetaTags",
          localField: "season.0.episodes.metaTags",
          foreignField: "_id",
          as: "populatedMetaTags",
        },
      },
      {
        $set: {
          "season.0.episodes": {
            $map: {
              input: "$season.0.episodes",
              as: "ep",
              in: {
                id: { $toString: "$$ep._id" },
                episode: "$$ep.episode",
                title: "$$ep.title",
                thumbnail: "$$ep.thumbnail",
                duration: "$$ep.duration",
                releaseDate: "$$ep.releaseDate",
                description: "$$ep.description",
                metaTags: {
                  $reduce: {
                    input: "$$ep.metaTags",
                    initialValue: [],
                    in: {
                      $concatArrays: [
                        "$$value",
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: "$populatedMetaTags",
                                as: "tag",
                                cond: { $eq: ["$$tag._id", "$$this"] },
                              },
                            },
                            as: "filteredTag",
                            in: "$$filteredTag.title",
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
      {
        $unset: "populatedMetaTags",
      },
      {
        $project: {
          _id: 0,
          episodes: "$season.0.episodes",
          totalEpisodes: 1,
          totalPages: {
            $cond: {
              if: { $eq: [showAll, "true"] },
              then: 1,
              else: { $ceil: { $divide: ["$totalEpisodes", pageSize] } },
            },
          },
        },
      },
    ];

    const seasonEpisodesPayload = await db
      .collection(SERIES)
      .aggregate(pipelineStages)
      .toArray();

    const result = seasonEpisodesPayload[0] || {
      totalEpisodes: 0,
      episodes: [],
      totalPages: 0,
    };
    if (showAll === "true") {
      result.pageNumber = 1;
      result.pageSize = result.totalEpisodes;
    } else {
      result.pageNumber = pageNumber;
      result.pageSize = pageSize;
    }

    return NextResponse.json(
      {
        ...result,
        currentSortOrder: sortOrder,
      },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? (error as Error).message
        : "Internal Server Error";

    return NextResponse.json(
      {
        error: true,
        errorMessage,
      },
      { status: 500 },
    );
  }
};

export { getSeriesSeasonEpisodes as GET };
