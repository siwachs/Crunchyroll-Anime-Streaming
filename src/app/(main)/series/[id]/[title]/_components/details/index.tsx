import Ratings from "./_components/ratings";
import ContentActionButtons from "@/components/contentActionButtons";
import Description from "./_components/description";

import { MdMoreVert } from "react-icons/md";

import "./index.css";

const Details: React.FC = () => {
  return (
    <div className="details-wrapper">
      <div className="body">
        <div className="heading-line">
          <h1 className="text-rendering-optimized">Dragon Ball DAIMA</h1>

          <button title="More actions" className="series-page-icon p-2">
            <MdMoreVert className="series-page-icon-size" />
          </button>
        </div>

        <div className="tags">
          <span>12</span>
          <span className="rhombus">Sub | Dub</span>
        </div>

        <Ratings />

        <ContentActionButtons
          className="mb-4"
          watchActionhref="/"
          watchActionText="Start Watching E1"
          enableAddToWatchListActionText
        />

        <Description />
      </div>

      <div className="up-next-section"></div>

      <div className="sticky-buttons-wrapper">
        <ContentActionButtons
          watchActionhref="/"
          watchActionText="Start Watching E1"
        />
      </div>
    </div>
  );
};

export default Details;
