import Link from "next/link";
import Image from "next/image";

import {
  cleanString,
  getTitleWithSeasonAndEpisodeNumber,
  getLocaleDate,
} from "@/lib/utils";

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
  const releaseDate = getLocaleDate(episode.releaseDate);

  return (
    <div className="playable-card-hover-info app-transition-opacity absolute inset-0 z-[1] opacity-0">
      <div className="playable-card-hover-preview relative flex size-full bg-[var(--app-overlay-secondary)]">
        <Link
          href={episodeLink}
          prefetch={false}
          title={episodeTitle}
          className="absolute inset-0 z-[1]"
        />

        <div className="playable-card-hover-thumbnail-placeholder relative block aspect-video h-[5.3125rem] flex-[0_0_auto] sm:hidden" />

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
            <span>{releaseDate}</span>
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
      className={`app-transition-colors relative flex ${cardType === "default" ? "playable-card sm:block" : "playable-card-mini"}`}
    >
      {cardType === "mini" && (
        <Link
          href={episodeLink}
          prefetch={false}
          title={episodeTitle}
          className="absolute inset-0 z-[2]"
        />
      )}

      <Link
        href={episodeLink}
        prefetch={false}
        tabIndex={-1}
        className={
          cardType === "default"
            ? "playable-card-thumbnail-wrapper relative block aspect-video h-[5.3125rem] flex-[0_0_auto] sm:h-auto"
            : "playable-card-mini-thumbnail-wrapper"
        }
      >
        <figure
          className={
            cardType === "default"
              ? "playable-card-thumbnail relative size-full"
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

      <div className="relative flex flex-1 items-center">
        <div
          className={
            cardType === "default"
              ? "playable-card-body flex min-h-[4.3125rem] flex-1 flex-col items-center justify-between py-1 pl-3 sm:min-h-[auto] sm:pt-3 sm:pb-0 sm:pl-0"
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
