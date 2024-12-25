"use client";

import { useState } from "react";
import Link from "next/link";

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
        <p className="whitespace-pre-line text-sm/leading-4.5 font-medium sm:text-base">
          {description}
        </p>

        {genres && genres.length > 0 && (
          <div className="genres-wrapper">
            {genres.map((genre, index) => (
              <div
                key={index}
                className="mb-2 mr-2 inline-flex max-w-[20.9375rem] bg-[var(--app-badge)]"
              >
                <Link
                  href="/#"
                  prefetch={false}
                  className="outline-sm app-transition-colors flex w-full select-none items-center px-2 py-1.5 hover:bg-[hsla(0,0%,100%,.078)]"
                >
                  <small className="inline-block truncate text-xs font-semibold uppercase text-[var(--app-icon-primary)]">
                    {genre}
                  </small>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="show-details-table">
          {Object.entries(expandableTableRows).map(([key, value], index) => (
            <div key={index} className="show-details-table-row">
              <div className="show-details-table-column-name self-start text-sm/leading-4.5 font-medium">
                <h5>{key}</h5>
              </div>

              <div className="text-right text-sm/leading-4.5 font-medium">
                <h5>{value}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toogleDescriptionIsExpanded}
        className="app-transition-colors mt-5 select-none text-xs font-black uppercase text-[var(--app-background-crunchyroll-orange)] hover:text-white focus-visible:text-white"
      >
        {descriptionIsExpanded ? "Fewer details" : "More details"}
      </button>
    </div>
  );
};

export default Description;
