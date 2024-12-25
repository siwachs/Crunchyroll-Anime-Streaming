import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import Dropdown from "@/components/dropdown";

import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlinePlay } from "react-icons/hi2";
import { MdMoreVert } from "react-icons/md";

import "./common.css";
import "./playableCardMini.css";
import "./index.css";

interface Episode {
  episodeNumber: number;
  thumbnail: StaticImageData | string;
  duration: string;
  seriesTitle?: string;
  title: string;
  releaseDate?: string;
  description?: string;
  metaTags: string;
}

interface PlayableCardProps extends Episode {
  cardType?: "default" | "mini";
}

const PlayableCard: React.FC<PlayableCardProps> = ({
  episodeNumber,
  thumbnail,
  duration,
  seriesTitle = "",
  title,
  releaseDate = "",
  description = "",
  metaTags,
  cardType = "default",
}) => {
  const encodedSeriesTitle = encodeURIComponent(
    seriesTitle.toLowerCase().replaceAll(" ", "-"),
  );
  const encodedEpisodeTitle = title.toLowerCase().replaceAll(" ", "-");
  const transformedEpisodeTitle = `E${episodeNumber} - ${title}`;

  const playableCardSeriesLink = `/series/428sj84/${encodedSeriesTitle}`;
  const playableCardMediaLink = `/watch/47dh3i9/${encodedEpisodeTitle}`;
  const playButtonTitle = `Play E${episodeNumber}`;

  return (
    <div
      className={
        cardType === "default" ? "playable-card" : "playable-card-mini"
      }
    >
      {cardType === "mini" && (
        <Link
          href={playableCardMediaLink}
          prefetch={false}
          title={transformedEpisodeTitle}
          className="playable-card-mini-link"
        />
      )}

      <Link
        href={playableCardMediaLink}
        prefetch={false}
        tabIndex={-1}
        className={
          cardType === "default"
            ? "playable-card-thumbnail-wrapper"
            : "playable-card-mini-thumbnail-wrapper"
        }
      >
        <figure
          className={
            cardType === "default"
              ? "playable-card-thumbnail"
              : "playable-card-mini-thumbnail"
          }
        >
          <Image
            sizes={
              cardType === "default"
                ? "(max-width: 567px) 230px, (max-width: 799px) calc(84.375rem / 2), (max-width: 1023px) calc(84.375rem / 3), 260px"
                : "230px"
            }
            src={thumbnail}
            alt={transformedEpisodeTitle}
            className="block size-full object-cover"
          />
        </figure>

        <div className="playable-card-duration">{duration}</div>
      </Link>

      {cardType === "default" && (
        <div className="playable-card-hover-info">
          <div className="playable-card-hover-preview">
            <Link
              href={playableCardMediaLink}
              prefetch={false}
              title={transformedEpisodeTitle}
              className="absolute inset-0 z-[1]"
            />

            <div className="playable-card-thumbnail-wrapper playable-card-hover-thumbnail-wrapper">
              <figure className="playable-card-thumbnail">
                <Image
                  sizes="230px"
                  src={thumbnail}
                  alt={transformedEpisodeTitle}
                  className="block size-full object-cover"
                />
              </figure>

              <div className="playable-card-duration">{duration}</div>
            </div>

            <div className="playable-card-hover-body">
              <Link
                href={playableCardSeriesLink}
                prefetch={false}
                className="playable-card-small-title z-[1]"
              >
                <small className="app-transition-colors hover:text-white hover:underline">
                  {seriesTitle}
                </small>
              </Link>

              <h4 className="playable-card-title playable-card-hover-title">
                {transformedEpisodeTitle}
              </h4>

              <p className="playable-card-hover-release">
                <HiOutlineCalendar className="mr-1 size-4" />
                <span>{releaseDate}</span>
              </p>

              <div className="playable-card-hover-description-wrapper">
                <p>{description}</p>
              </div>

              <div className="playable-card-footer">
                <div className="playable-card-hover-play">
                  <HiOutlinePlay
                    strokeWidth={2.08}
                    className="block size-6 flex-[0_0_auto]"
                  />
                  <span>{playButtonTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="playable-card-body-aligner">
        <div
          className={
            cardType === "default"
              ? "playable-card-body"
              : "playable-card-mini-body"
          }
        >
          {seriesTitle && (
            <div className="playable-card-small-title">
              <small>{seriesTitle}</small>
            </div>
          )}

          <h4 className="playable-card-title">
            <Link href={playableCardMediaLink} prefetch={false} tabIndex={-1}>
              {transformedEpisodeTitle}
            </Link>
          </h4>

          <div className="playable-card-footer">
            <div className="meta-tags line-clamp-2 flex-1 sm:line-clamp-1">
              <span>{metaTags}</span>
            </div>

            {cardType === "default" && (
              <Dropdown
                dropdownTriggerClassName="z-[1] hover:text-white"
                Icon={<MdMoreVert className="size-6" />}
                dropdownTriggerNoHoverBg
                dropdownContentTitle="Options"
                dropdownContentScrollableList={[
                  <button key={0}>Mark as Watched</button>,
                ]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayableCard;
