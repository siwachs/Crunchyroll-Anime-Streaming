"use client";

import { useState } from "react";

import "./index.css";

const DetailItem: React.FC<{ detailKey?: string; detailValue: string }> = ({
  detailKey,
  detailValue,
}) => {
  return (
    <div className="text-sm/4.5 font-medium text-[var(--meta-color)]">
      {detailKey ? (
        <>
          <h5 className="inline text-white">{detailKey}: </h5>
          <h5 className="inline">{detailValue}</h5>
        </>
      ) : (
        <span className="text-xs font-semibold">{detailValue}</span>
      )}
    </div>
  );
};

const Details: React.FC<{
  description: string;
  details: Record<string, string>;
  genres: string[];
  licence?: string;
}> = ({ description, details, genres, licence }) => {
  const [detailsIsExpanded, setDetailsIsExpanded] = useState(false);

  function toogleDescriptionIsExpanded() {
    setDetailsIsExpanded((prev) => !prev);
  }

  return (
    <div className="container-cmp">
      <div className="series-details relative pb-3">
        <div
          className={`overflow-hidden ${detailsIsExpanded ? "max-h-full" : "series-details-wrapper-is-faded max-h-18 sm:max-h-24"}`}
        >
          <div className="grid gap-7.5 md:grid-cols-[repeat(12,1fr)]">
            <div className="3xl:col-[1/span_4] whitespace-pre-line md:col-span-6 xl:col-[1/span_6]">
              <p className="text-sm/4.5 font-medium sm:text-base">
                {description}
              </p>
            </div>

            <div className="3xl:col-[6/span_4] flex flex-col gap-2.5 md:col-span-6 xl:col-[8/span_5]">
              {Object.keys(details).map((key, index) => (
                <DetailItem
                  key={index}
                  detailKey={key}
                  detailValue={details[key]}
                />
              ))}

              <DetailItem detailKey="Genres" detailValue={genres.join(", ")} />
              {licence && <DetailItem detailValue={licence} />}
            </div>
          </div>
        </div>

        <button
          onClick={toogleDescriptionIsExpanded}
          className="app-transition-colors mt-5 block cursor-pointer text-xs font-black text-[var(--app-background-crunchyroll-orange)] uppercase hover:text-white focus-visible:text-white"
        >
          {detailsIsExpanded ? "Fewer details" : "More details"}
        </button>
      </div>
    </div>
  );
};

export default Details;
