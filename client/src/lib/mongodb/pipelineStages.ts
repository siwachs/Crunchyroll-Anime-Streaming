function getMetaTagsWithoutNumericTypeTags() {
  return [
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
  ];
}

function getEpisodeIdAndTitle() {
  return [
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
}

export { getMetaTagsWithoutNumericTypeTags, getEpisodeIdAndTitle };
