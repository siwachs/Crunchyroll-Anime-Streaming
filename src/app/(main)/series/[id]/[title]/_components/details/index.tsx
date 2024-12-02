import Ratings from "./_components/ratings";

import { MdMoreVert } from "react-icons/md";

import "./index.css";

const Details: React.FC = () => {
  return (
    <div className="details-wrapper">
      <div className="body">
        <div className="heading-line">
          <h1 className="text-rendering-optimized">Dragon Ball DAIMA</h1>

          <button
            title="More actions"
            className="block p-2 text-[var(--meta-color)] transition-colors duration-200 ease-quick hover:bg-[var(--app-background-secondary)] hover:text-white"
          >
            <MdMoreVert className="size-6" />
          </button>
        </div>

        <div className="tags">
          <span>12</span>
          <span className="rhombus">Sub | Dub</span>
        </div>

        <Ratings />
      </div>

      <div className="up-next-section"></div>

      <div className="sticky-buttons-wrapper"></div>
    </div>
  );
};

export default Details;
