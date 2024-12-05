"use client";

import { useState } from "react";

import "./index.css";

const expandableTableRows = {
  Publisher: "Toei Animation",
  Audio: "Japanese, हिंदी, தமிழ், తెలుగు",
  Subtitles: "English, Bahasa Indonesia, 中文 (简体), ไทย",
};

const Description: React.FC = () => {
  const [descriptionIsExpanded, setDescriptionIsExpanded] = useState(false);

  function toogleDescriptionIsExpanded() {
    setDescriptionIsExpanded((prev) => !prev);
  }

  return (
    <div>
      <div
        className={`expandable-section ${descriptionIsExpanded ? "expandable-section-is-expanded" : "expandable-section-mask"}`}
      >
        <p>
          Goku and company were living peaceful lives when they suddenly turned
          small due to a conspiracy! When they discover that the reason for this
          may lie in a world known as the "Demon Realm", a mysterious young
          Majin named Glorio appears before them.
        </p>

        <div className="expandable-section-table">
          {Object.entries(expandableTableRows).map(([key, value], index) => (
            <div key={index} className="expandable-section-table-row">
              <div>
                <h5>{key}</h5>
              </div>

              <div>
                <h5>{value}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={toogleDescriptionIsExpanded}
        className="mt-5 select-none text-xs font-black uppercase text-[var(--app-background-crunchyroll-orange)] transition-[color] duration-200 ease-quick hover:text-white"
      >
        {descriptionIsExpanded ? "Fewer details" : "More details"}
      </button>
    </div>
  );
};

export default Description;
