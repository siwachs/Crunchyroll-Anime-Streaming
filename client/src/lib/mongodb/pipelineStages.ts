const metaTags = [
  {
    $lookup: {
      from: "MetaTags",
      localField: "metaTags",
      foreignField: "_id",
      as: "populatedMetaTags",
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

const genres = [
  {
    $lookup: {
      from: "Genres",
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
      from: "MetaTags",
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
      from: "Seasons",
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
      from: "Episodes",
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

export { metaTags, genres, metaTagsWithoutNumericTypeTags, episodeIdAndTitle };
