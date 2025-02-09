"use client";

import { useState } from "react";

import "./index.css";

const Description: React.FC<{
  description: string;
  genres?: string[];
  expandableTableRows: Record<string, string>;
}> = ({ description, genres, expandableTableRows }) => {
  const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false);

  function toogleDescriptionIsExpanded() {
    setDescriptionIsExpanded((prev) => !prev);
  }

  return (
    <div>
      <div
        className={`expandable-section ${descriptionIsExpanded ? "expandable-section-is-expanded" : "expandable-section-mask"}`}
      >
        <p className="text-sm/leading-4.5 font-medium whitespace-pre-line sm:text-base">
          {description}
        </p>

        {genres && genres.length > 0 && <div className="genres-wrapper"></div>}

        <div className="show-details-table">
          {Object.entries(expandableTableRows).map(([key, value], index) => (
            <div key={index} className="show-details-table-row">
              <div className="show-details-table-column-name text-sm/leading-4.5 self-start font-medium">
                <h5>{key}</h5>
              </div>

              <div className="text-sm/leading-4.5 text-right font-medium">
                <h5>{value}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toogleDescriptionIsExpanded}
        className="app-transition-colors mt-5 text-xs font-black text-[var(--app-background-crunchyroll-orange)] uppercase select-none hover:text-white focus-visible:text-white"
      >
        {descriptionIsExpanded ? "Fewer details" : "More details"}
      </button>
    </div>
  );
};

export default Description;
