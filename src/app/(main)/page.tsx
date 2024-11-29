import Banner from "./_components/banner";
import DataFeedRow from "./_components/dataFeedRow";
import PromotionBanner from "./_components/promotionBanner";

export default function Home() {
  return (
    <>
      <main className="feed relative grid flex-[1_1_0] gap-y-12 pb-10 sm:gap-y-[4.5rem] xl:gap-y-24">
        <Banner />

        <div className="dynamic-feed grid grid-cols-[minmax(0,auto)] gap-y-10">
          <DataFeedRow
            dataId="0"
            dataType="personalized-collection-1"
            dataTitle="Free to Watch In India"
            dataSubTitle="Fantastic Free Anime"
          />
          <PromotionBanner dataId="1" />
          <DataFeedRow
            dataId="2"
            dataType="personalized-collection-2"
            dataTitle="October 2024 Seasonal Sampler"
            dataSubTitle="Check out the first few episodes of these new shows for free!"
          />
        </div>

        <div className="container-cmp"></div>
      </main>

      <footer></footer>
    </>
  );
}
