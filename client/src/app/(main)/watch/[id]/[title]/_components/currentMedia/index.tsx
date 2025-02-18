import Link from "next/link";

import { cleanString, getCompactNotation, getReadableDate } from "@/lib/utils";

import AverageRating from "@/components/ratings/averageRating";
import Details from "../details";

import {
  AddToWatchListOutlined,
  AddToWatchListFilled,
} from "@/assets/addToWatchListIcons";
import {
  ThumbUpOutlined,
  ThumbUpFilled,
  ThumbDownOutlined,
  ThumbDownFilled,
} from "@/assets/watch/thumbIcons";

import "./index.css";

const CurrentMedia: React.FC<{
  seriesId: string;
  seriesTitle: string;
  averageRating: number;
  totalRating: number;
  title: string;
  metaTags: string[];
  releaseDate: string;
  likes: number;
  dislikes: number;
  description: string;
  details: Record<string, string>;
}> = ({
  seriesId,
  seriesTitle,
  averageRating,
  totalRating,
  title,
  metaTags,
  releaseDate,
  likes,
  dislikes,
  description,
  details,
}) => {
  const seriesLink = `/series/${seriesId}/${cleanString(seriesTitle)}`;

  const compactLikes = getCompactNotation(likes);
  const compactDislikes = getCompactNotation(dislikes);

  const readableReleaseDate = getReadableDate(releaseDate);

  return (
    <div className="current-media 2sm:mb-10 2md:flex mb-6">
      <div className="current-media-info flex-1">
        <div className="current-media-header mb-3 flex justify-between border-b-2 border-solid border-[var(--app-background-secondary)] pb-3 sm:mb-1 sm:border-none sm:pb-0">
          <div className="current-media-parent-ref mr-1 flex flex-[0_1_auto] flex-col sm:flex-row sm:flex-wrap sm:self-center">
            <Link
              href={seriesLink}
              prefetch={false}
              className="show-title-link app-transition-colors mb-1 text-[var(--app-background-crunchyroll-orange)] sm:flex sm:items-center"
            >
              <h4 className="text-base font-semibold">{seriesTitle}</h4>
            </Link>

            <AverageRating
              align="left"
              mode="compact"
              averageRating={averageRating}
              totalRating={totalRating}
              className="mb-1 self-center"
            />
          </div>

          <button className="current-media-action-button px-2 pb-2 sm:pt-2">
            <AddToWatchListOutlined />
            <AddToWatchListFilled />
          </button>
        </div>

        <h1 className="heading text-rendering-optimized 2md:mb-2 mb-2 text-xl/6.5 font-semibold sm:mb-3 sm:text-[1.375rem]/7">
          {title}
        </h1>

        <div className="meta-tags mb-2">
          {metaTags.map((metaTag, index) => (
            <span key={index} className={index === 0 ? "" : "rhombus"}>
              {metaTag}
            </span>
          ))}
        </div>

        <p className="mb-3 text-sm/4.5 font-medium sm:mb-2">
          Released on {readableReleaseDate}
        </p>

        <div className="episode-actions mb-5.5 flex items-center justify-between">
          <div className="episode-ratings inline-grid grid-flow-col gap-5">
            <button className="current-media-action-button episode-rate-action">
              <ThumbUpOutlined />
              <ThumbUpFilled />
              <span>{compactLikes}</span>
            </button>

            <button className="current-media-action-button episode-rate-action">
              <ThumbDownOutlined />
              <ThumbDownFilled />
              <span>{compactDislikes}</span>
            </button>
          </div>

          {/* Share Button Goes here */}
        </div>

        <Details description={description} details={details} />
      </div>
    </div>
  );
};

export default CurrentMedia;
