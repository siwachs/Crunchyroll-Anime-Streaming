import DataFeedCarousel from "./dataFeedCarousel";

import "./index.css";

const DataFeedRow: React.FC<{
  dataId: string;
  dataType: string;
  dataTitle: string;
  dataSubTitle: string;
}> = ({ dataId, dataType, dataTitle, dataSubTitle }) => {
  return (
    <div data-id={dataId} data-type={dataType}>
      <div className="container-cmp relative flex-wrap items-start pb-3 sm:pb-4">
        <h2 className="text-rendering-optimized flex-1 text-[1.375rem]/7 font-bold sm:text-2xl md:text-[1.75rem]/[2.25rem]">
          {dataTitle}
        </h2>
        <p className="mt-1 flex-[1_1_100%] text-sm/leading-4.5 font-medium text-[var(--meta-color)] sm:mt-2 sm:text-base">
          {dataSubTitle}
        </p>
      </div>

      <DataFeedCarousel />
    </div>
  );
};

export default DataFeedRow;
