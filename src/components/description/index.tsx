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
        <p className="whitespace-pre-line text-sm/leading-4.5 font-medium sm:text-base">
          {description}
        </p>

        <div className="show-details-table">
          {Object.entries(expandableTableRows).map(([key, value], index) => (
            <div key={index} className="show-details-table-row">
              <div className="show-details-table-column-name text-sm/leading-4.5 font-medium">
                <h5>{key}</h5>
              </div>

              <div className="text-sm/leading-4.5 font-medium">
                <h5>{value}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toogleDescriptionIsExpanded}
        className="app-transition-colors mt-5 select-none text-xs font-black uppercase text-[var(--app-background-crunchyroll-orange)] hover:text-white"
      >
        {descriptionIsExpanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default Description;
