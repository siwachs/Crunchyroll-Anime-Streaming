import Link from "next/link";
import Image from "next/image";

import { cleanString, getTitleWithSeasonAndEpisodeNumber } from "@/lib/utils";

import Dropdown from "@/components/dropdown";
import MarkEpisodeAsWatched from "@/components/dropdown/menuItems/markEpisodeAsWatched";

import { Season, Episode } from "@/types";

import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlinePlay } from "react-icons/hi2";
import { MdMoreVert } from "react-icons/md";

import "./common.css";
import "./playableCardMini.css";
import "./index.css";

const PlayableCardHoverInfo: React.FC<{
  episodeLink: string;
  episodeTitle: string;
  episode: Episode;
  seriesLink: string;
  title: string;
}> = ({ episodeLink, episodeTitle, episode, seriesLink, title }) => {
  return (
    <div className="playable-card-hover-info">
      <div className="playable-card-hover-preview">
        <Link
          href={episodeLink}
          prefetch={false}
          title={episodeTitle}
          className="absolute inset-0 z-[1]"
        />

        <div className="playable-card-thumbnail-wrapper playable-card-hover-thumbnail-wrapper">
          <figure className="playable-card-thumbnail">
            <Image
              fill
              sizes="230px"
              src={episode.thumbnail}
              alt={episodeTitle}
              className="block size-full object-cover"
            />
          </figure>

          <div className="playable-card-duration">{episode.duration}</div>
        </div>

        <div className="playable-card-hover-body">
          <Link
            href={seriesLink}
            prefetch={false}
            className="playable-card-small-title z-[1]"
          >
            <small className="app-transition-colors hover:text-white hover:underline">
              {title}
            </small>
          </Link>

          <h4 className="playable-card-title playable-card-hover-title">
            {episodeTitle}
          </h4>

          <p className="playable-card-hover-release">
            <HiOutlineCalendar className="mr-1 size-4" />
            <span>{episode.releaseDate}</span>
          </p>

          <div className="playable-card-hover-description-wrapper">
            <p>{episode.description}</p>
          </div>

          <div className="playable-card-footer">
            <div className="playable-card-hover-play">
              <HiOutlinePlay
                strokeWidth={2.08}
                className="block size-6 flex-[0_0_auto]"
              />
              <span>Play</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlayableCard: React.FC<{
  seriesId: string;
  title: string;
  currentSeason: Season;
  episode: Episode;
  cardType?: "default" | "mini";
}> = ({ seriesId, title, currentSeason, episode, cardType = "default" }) => {
  const episodeLink = `/watch/${episode.id}/${cleanString(episode.title)}`;
  const seriesLink = `/series/${seriesId}/${cleanString(title)}`;

  const episodeTitle = getTitleWithSeasonAndEpisodeNumber(
    currentSeason.season,
    episode.episode,
    episode.title,
  );

  return (
    <div
      className={
        cardType === "default" ? "playable-card" : "playable-card-mini"
      }
    >
      {cardType === "mini" && (
        <Link
          href={episodeLink}
          prefetch={false}
          title={episodeTitle}
          className="playable-card-mini-link"
        />
      )}

      <Link
        href={episodeLink}
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
            fill
            sizes={
              cardType === "default"
                ? "(max-width: 567px) 230px, (max-width: 799px) calc(84.375rem / 2), (max-width: 1023px) calc(84.375rem / 3), 260px"
                : "230px"
            }
            src={episode.thumbnail}
            alt={episodeTitle}
            className="block size-full object-cover"
          />
        </figure>

        <div className="playable-card-duration">{episode.duration}</div>
      </Link>

      {cardType === "default" && (
        <PlayableCardHoverInfo
          episodeLink={episodeLink}
          episodeTitle={episodeTitle}
          episode={episode}
          seriesLink={seriesLink}
          title={title}
        />
      )}

      <div className="playable-card-body-aligner">
        <div
          className={
            cardType === "default"
              ? "playable-card-body"
              : "playable-card-mini-body"
          }
        >
          {title && (
            <div className="playable-card-small-title">
              <small>{title}</small>
            </div>
          )}

          <h4 className="playable-card-title">
            <Link href={episodeLink} prefetch={false} tabIndex={-1}>
              {episodeTitle}
            </Link>
          </h4>

          <div className="playable-card-footer">
            <div className="meta-tags line-clamp-2 flex-1 sm:line-clamp-1">
              {episode.metaTags.map((metaTag, index) => (
                <span key={index} className={index === 0 ? "" : "rhombus"}>
                  {metaTag}
                </span>
              ))}
            </div>

            {cardType === "default" && (
              <Dropdown
                align="right"
                className="z-1"
                triggerClassName="hover:text-white focus-visible:text-white"
                triggerActiveClassName="text-white"
                Icon={<MdMoreVert className="size-6" />}
                headerTitle="More Options"
              >
                <MarkEpisodeAsWatched />
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayableCard;
