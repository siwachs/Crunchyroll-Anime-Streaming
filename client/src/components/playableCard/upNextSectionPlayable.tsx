import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import WatchAction from "@/components/contentActionButtons/watchAction";

import "./common.css";

const UpNextSectionPlayable: React.FC<{
  className?: string;
  seriesId: string;
  seriesTitle: string;
  upNextThumbnail: StaticImageData | string;
  duration: string;
  watchActionText: string;
}> = ({
  className = "up-next-section",
  seriesId,
  seriesTitle,
  upNextThumbnail,
  duration,
  watchActionText,
}) => {
  const upNextSectionLink = `/watch/${seriesId}/${encodeURIComponent(seriesTitle.toLowerCase().replaceAll(" ", "-"))}`;

  return (
    <div className={className}>
      <Link
        href={upNextSectionLink}
        prefetch={false}
        className="relative block"
      >
        <figure className="playable-card-thumbnail playable-card-thumbnail-has-width mb-3">
          <Image
            sizes="360px"
            src={upNextThumbnail}
            alt={seriesTitle}
            className="block size-full object-cover"
          />
        </figure>

        <div className="playable-card-duration">{duration}</div>
      </Link>

      <WatchAction
        watchActionhref={upNextSectionLink}
        watchActionText={watchActionText}
        className="md:w-full"
      />
    </div>
  );
};

export default UpNextSectionPlayable;
