import Link from "next/link";
import Image from "next/image";

import Ratings from "./_components/ratings";
import ContentActionButtons from "@/components/contentActionButtons";
import Description from "./_components/description";
import WatchAction from "@/components/contentActionButtons/watchAction";

import { MdMoreVert } from "react-icons/md";

import upNextThumbanil from "@/assets/episodeList/0.avif";
import "./index.css";

const Details: React.FC = () => {
  return (
    <div className="details-wrapper">
      <div className="body">
        <div className="heading-line">
          <h1 className="text-rendering-optimized">Dragon Ball DAIMA</h1>

          <button
            title="More actions"
            className="series-page-icon p-2 md:mt-0.5"
          >
            <MdMoreVert className="series-page-icon-size" />
          </button>
        </div>

        <div className="tags">
          <span>12</span>
          <span className="rhombus">Sub | Dub</span>
        </div>

        <Ratings />

        <ContentActionButtons
          watchActionhref="#watchEpisode"
          watchActionText="Start Watching E1"
          enableDetailsPageStyles
        />

        <Description />
      </div>

      <div className="up-next-section">
        <Link href="#watch" prefetch={false} className="relative block">
          <figure className="playable-card-thumbnail playable-card-thumbnail-has-width mb-3">
            <Image
              src={upNextThumbanil}
              alt="Dragon Ball DAIMA"
              className="block size-full object-cover"
            />
          </figure>

          <div className="playable-card-duration">32m</div>
        </Link>

        <WatchAction
          watchActionhref="#watchEpisode"
          watchActionText="Start Watching E1"
          className="md:w-full"
        />
      </div>

      <div className="sticky-buttons-wrapper">
        <ContentActionButtons
          watchActionhref="#watch"
          watchActionText="Start Watching E1"
        />
      </div>
    </div>
  );
};

export default Details;
