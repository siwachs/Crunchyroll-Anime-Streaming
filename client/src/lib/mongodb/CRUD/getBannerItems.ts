import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

import connectToDb from "../connectToDb";

import { BannerItem } from "@/app/(main)/_components/banner/index.types";

import {
  ASIA_COUNTRIES,
  MIDDLE_EAST_COUNTRIES,
  WEST_COUNTRIES,
} from "@/constants/countriesCodes";

function getContinent(clientGeoCountry: string) {
  if (ASIA_COUNTRIES.includes(clientGeoCountry)) return "ASIA";
  else if (MIDDLE_EAST_COUNTRIES.includes(clientGeoCountry))
    return "MIDDLE_EAST";
  else if (WEST_COUNTRIES.includes(clientGeoCountry)) return "WEST";

  return clientGeoCountry;
}

export default async function getBannerItems(): Promise<BannerItem[]> {
  const headersList = await headers();

  const clientGeoCountry = headersList.get("x-client-geo-country") as string;
  const continent = getContinent(clientGeoCountry);
  console.log(continent);

  const getCachedBanner = unstable_cache(
    async () => {
      const { db } = await connectToDb();

      return await db
        .collection("Series")
        .aggregate([
          { $sample: { size: 6 } },
          {
            $lookup: {
              from: "MetaTags",
              localField: "metaTags",
              foreignField: "_id",
              as: "populatedMetaTags",
            },
          },
          {
            $project: {
              title: 1,
              banner: 1,
              metaTags: "$populatedMetaTags.title",
              description: 1,
            },
          },
        ])
        .toArray();
    },
    ["banner", continent],
    {
      revalidate: 259200, // Revalidate every 3 days
    },
  );

  const cachedBannerArray = await getCachedBanner();
  return cachedBannerArray.map((bannerItem) => {
    const { _id, ...restOfBannerItem } = bannerItem;

    return { id: _id.toString(), ...restOfBannerItem } as BannerItem;
  });
}
