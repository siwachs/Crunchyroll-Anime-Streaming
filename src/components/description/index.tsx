"use client";

import { useState } from "react";

import "./index.css";

const Description: React.FC<{
  description: string;
  expandableTableRows: Record<string, string>;
}> = ({ description, expandableTableRows }) => {
  const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false);

  function toogleDescriptionIsExpanded() {
    setDescriptionIsExpanded((prev) => !prev);
  }

  return (
    <div>
      <div
        className={`expandable-section ${descriptionIsExpanded ? "expandable-section-is-expanded" : "expandable-section-mask"}`}
      >
        <p className="app-text-is-m whitespace-pre-line sm:text-base">
          {description}
        </p>

        <div className="show-details-table">
          {Object.entries(expandableTableRows).map(([key, value], index) => (
            <div key={index} className="show-details-table-row">
              <div className="app-text-is-m show-details-table-column-name">
                <h5>{key}</h5>
              </div>

              <div className="app-text-is-m">
                <h5>{value}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toogleDescriptionIsExpanded}
        className="app-text-is-s app-transition-colors mt-5 select-none uppercase text-[var(--app-background-crunchyroll-orange)] hover:text-white"
      >
        {descriptionIsExpanded ? "Fewer details" : "More details"}
      </button>
    </div>
  );
};

export default Description;
