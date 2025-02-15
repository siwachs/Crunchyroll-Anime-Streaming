import DataFeedCarousel from "./dataFeedCarousel";

import { DataFeedItem } from "./index.types";

import "./index.css";

const DataFeedRow: React.FC<{
  dataTitle: string;
  dataSubTitle?: string;
  dataFeed: DataFeedItem[];
}> = ({ dataTitle, dataSubTitle, dataFeed }) => {
  return (
    <div>
      <div className="container-cmp relative flex-wrap items-start pb-3 sm:pb-4">
        <h2 className="text-rendering-optimized text-1.5xl/7 md:text-2.5xl/9 flex-1 font-bold sm:text-2xl">
          {dataTitle}
        </h2>

        {dataSubTitle && (
          <p className="mt-1 flex-[1_1_100%] text-sm/4.5 font-medium text-[var(--meta-color)] sm:mt-2 sm:text-base">
            {dataSubTitle}
          </p>
        )}
      </div>

      <DataFeedCarousel dataFeed={dataFeed} />
    </div>
  );
};

export default DataFeedRow;
