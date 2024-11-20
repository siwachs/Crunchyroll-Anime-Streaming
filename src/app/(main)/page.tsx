import Banner from "./_components/banner";
import DataFeedRow from "./_components/dataFeedRow";

export default function Home() {
  return (
    <>
      <main className="feed relative grid flex-[1_1_0] gap-y-12 pb-10">
        <Banner />

        <div className="dynamic-feed grid grid-cols-[minmax(0,auto)] gap-y-10">
          <DataFeedRow
            dataId="0"
            dataType="personalized-collection-1"
            dataTitle="Free to Watch In India"
            dataSubTitle="Fantastic Free Anime"
          />
        </div>
        <div className="container-cmp"></div>
      </main>

      <footer></footer>
    </>
  );
}
