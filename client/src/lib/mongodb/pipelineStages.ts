import { METATAGS, GENRES, SEASONS, EPISODES } from "./collectionNames";

function getMetaTags(
  localField = "metaTags",
  foreignField = "_id",
  as = "populatedMetaTags",
) {
  return [
    {
      $lookup: {
        from: METATAGS,
        localField,
        foreignField,
        as,
      },
    },
    {
      $set: {
        populatedMetaTags: {
          $sortArray: { input: `$${as}`, sortBy: { title: 1 } },
        },
      },
    },
  ];
}

const genres = [
  {
    $lookup: {
      from: GENRES,
      localField: "genres",
      foreignField: "_id",
      as: "populatedGenres",
    },
  },
  {
    $set: {
      populatedGenres: {
        $sortArray: { input: "$populatedGenres", sortBy: { title: 1 } },
      },
    },
  },
];

const metaTagsWithoutNumericTypeTags = [
  {
    $lookup: {
      from: METATAGS,
      localField: "metaTags",
      foreignField: "_id",
      as: "populatedMetaTags",
    },
  },
  {
    $addFields: {
      populatedMetaTags: {
        $filter: {
          input: "$populatedMetaTags",
          as: "metaTag",
          cond: {
            $not: [
              {
                $regexMatch: {
                  input: "$$metaTag.title",
                  regex: /^\d+$/,
                },
              },
            ],
          },
        },
      },
    },
  },
  {
    $set: {
      populatedMetaTags: {
        $sortArray: { input: "$populatedMetaTags", sortBy: { title: 1 } },
      },
    },
  },
];

const episodeIdAndTitle = [
  {
    $addFields: { seasonId: { $arrayElemAt: ["$seasons", 0] } },
  },
  {
    $lookup: {
      from: SEASONS,
      localField: "seasonId",
      foreignField: "_id",
      as: "populatedSeason",
    },
  },
  {
    $addFields: {
      episodeId: {
        $arrayElemAt: [{ $arrayElemAt: ["$populatedSeason.episodes", 0] }, 0],
      },
    },
  },
  {
    $lookup: {
      from: EPISODES,
      localField: "episodeId",
      foreignField: "_id",
      as: "populatedEpisode",
    },
  },
  {
    $addFields: {
      episodeTitle: { $arrayElemAt: ["$populatedEpisode.title", 0] },
    },
  },
];

function getSeasons(
  localField = "seasons",
  foreignField = "_id",
  as = "populatedSeasons",
) {
  return [
    {
      $lookup: {
        from: SEASONS,
        localField,
        foreignField,
        as,
      },
    },
  ];
}

function getEpisodes(localField = "episodes", foreignField = "_id") {
  return [
    {
      $lookup: {
        from: EPISODES,
        localField,
        foreignField,
        as: "populatedEpisodes",
      },
    },
  ];
}

export {
  getMetaTags,
  genres,
  metaTagsWithoutNumericTypeTags,
  episodeIdAndTitle,
  getSeasons,
  getEpisodes,
};
