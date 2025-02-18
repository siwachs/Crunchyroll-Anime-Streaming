"use client";

import { useState } from "react";

import "./index.css";

const Details: React.FC<{
  description: string;
  details: Record<string, string>;
}> = ({ description, details }) => {
  const [detailsIsExpanded, setDetailsIsExpanded] = useState(false);

  function toogleDescriptionIsExpanded() {
    setDetailsIsExpanded((prev) => !prev);
  }

  return (
    <div>
      <div
        className={`overflow-hidden ${detailsIsExpanded ? "max-h-full" : "series-details-wrapper-is-faded max-h-18 sm:max-h-24"}`}
      >
        <div>
          <p className="text-sm/4.5 font-medium whitespace-pre-line sm:text-base">
            {description}
          </p>

          <div className="my-3">
            {Object.keys(details).map((key, index) => (
              <div
                key={index}
                className="details-table-row grid grid-cols-[40%_1fr] py-3"
              >
                <div className="align-self-start">
                  <h5 className="text-sm/4.5 font-semibold sm:text-base">
                    {key}
                  </h5>
                </div>

                <div className="text-right">
                  <h5 className="text-sm/4.5 font-medium">{details[key]}</h5>
                </div>
              </div>
            ))}
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
  );
};

export default Details;
