import {
  getBannerItems,
  getTopPicksForYou,
  getNewlyAddedSeries,
} from "@/lib/mongodb/CRUD/getHomePage";

import Banner from "./_components/banner";
import DataFeedRow from "./_components/dataFeedRow";
import NewEpisodes from "./_components/newEpisodes";

export default async function Home() {
  const bannerItems = await getBannerItems();
  const topPicksForYou = await getTopPicksForYou();
  const newlyAddedSeries = await getNewlyAddedSeries();

  return (
    <>
      <main className="feed relative grid gap-y-12 sm:gap-y-[4.5rem] xl:gap-y-24">
        <Banner bannerItems={bannerItems} />

        <div className="dynamic-feed grid grid-cols-[minmax(0,auto)] gap-y-10">
          <DataFeedRow
            dataTitle="Top Picks for You"
            dataFeed={topPicksForYou}
          />

          <DataFeedRow
            dataTitle="Recently Updated Shows"
            dataSubTitle="Discover the latest episodes and seasons of these newly updated shows"
            dataFeed={newlyAddedSeries}
          />

          <NewEpisodes />

          {/* <PromotionBanner /> */}
        </div>

        {/* Show whole Library */}
        <div className="container-cmp"></div>
      </main>

      <footer></footer>
    </>
  );
}
