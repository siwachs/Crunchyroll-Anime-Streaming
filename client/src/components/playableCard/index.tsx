import Link from "next/link";
import Image from "next/image";

import {
  cleanString,
  getTitleWithSeasonAndEpisodeNumber,
  getLocaleDate,
  secondsToFormattedSeconds,
} from "@/lib/utils";

import Dropdown from "@/app/(main)/series/[id]/[title]/_components/dropdown";
import MarkEpisodeAsWatched from "@/app/(main)/series/[id]/[title]/_components/dropdown/menuItems/markEpisodeAsWatched";

import { Season, Episode } from "@/providers/seaonEpisodes/index.types";

import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlinePlay } from "react-icons/hi2";
import { MdMoreVert } from "react-icons/md";

import "./common.css";
import "./index.css";

const PlayableCardHoverInfo: React.FC<{
  episodeLink: string;
  episodeTitle: string;
  currentSeason: Season;
  episode: Episode;
  seriesLink: string;
  title: string;
}> = ({
  episodeLink,
  episodeTitle,
  currentSeason,
  episode,
  seriesLink,
  title,
}) => {
  const releaseDate = getLocaleDate(episode.releaseDate);
  const playButtonText = getTitleWithSeasonAndEpisodeNumber(
    currentSeason.season,
    episode.episode,
    "",
    "",
  );

  const formattedDuration = secondsToFormattedSeconds(episode.duration);

  return (
    <div className="playable-card-hover-info app-transition-opacity absolute inset-0 z-1 opacity-0">
      <div className="playable-card-hover-preview relative flex size-full bg-[var(--app-overlay-secondary)]">
        <Link
          href={episodeLink}
          prefetch={false}
          title={episodeTitle}
          className="absolute inset-0 z-1"
        />

        <div className="playable-card-hover-thumbnail relative block aspect-video h-[5.3125rem] flex-[0_0_auto] sm:hidden">
          <figure className="relative size-full">
            <Image
              fill
              sizes="230px"
              src={episode.thumbnail}
              alt={episodeTitle}
              className="block size-full object-cover"
            />
          </figure>

          <div className="playable-card-duration">{formattedDuration}</div>
        </div>

        <div className="flex flex-1 flex-col pt-3 pb-[0.7625rem] pl-3 sm:p-0">
          <Link
            href={seriesLink}
            prefetch={false}
            className="playable-card-small-title outline-xs z-1"
          >
            <small className="app-transition-colors hover:text-white hover:underline focus-visible:text-white focus-visible:underline">
              {title}
            </small>
          </Link>

          <h4 className="playable-card-title playable-card-hover-title">
            {episodeTitle}
          </h4>

          <p className="playable-card-hover-release mb-2 hidden items-center text-sm/4.5 font-medium text-[var(--meta-color)] sm:flex">
            <HiOutlineCalendar className="mr-1 size-4" />
            <span>{releaseDate}</span>
          </p>

          <div className="playable-card-hover-description mb-2.5 hidden sm:block md:mb-2 lg:mb-3">
            <p className="line-clamp-5 text-sm/4.5 font-semibold">
              {episode.description}
            </p>
          </div>

          <div className="playable-card-footer">
            <Link
              href={episodeLink}
              prefetch={false}
              className="playable-card-hover-play outline-xs flex items-center gap-1 text-[var(--app-background-crunchyroll-orange)]"
            >
              <HiOutlinePlay
                strokeWidth={2.08}
                className="block size-6 flex-[0_0_auto]"
              />
              <span className="inline-block truncate text-sm/4.5 font-black uppercase">
                {playButtonText ? `Play ${playButtonText}` : "Play"}
              </span>
            </Link>
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
}> = ({ seriesId, title, currentSeason, episode }) => {
  const episodeLink = `/watch/${episode.id}/${cleanString(episode.title)}`;
  const seriesLink = `/series/${seriesId}/${cleanString(title)}`;

  const episodeTitle = getTitleWithSeasonAndEpisodeNumber(
    currentSeason.season,
    episode.episode,
    episode.title,
  );

  const formattedDuration = secondsToFormattedSeconds(episode.duration);

  return (
    <div className="playable-card app-transition-colors relative flex sm:block">
      <Link
        href={episodeLink}
        prefetch={false}
        tabIndex={-1}
        className="playable-card-thumbnail relative block aspect-video h-[5.3125rem] flex-[0_0_auto] sm:h-auto"
      >
        <figure className="relative size-full">
          <Image
            fill
            sizes="(max-width: 567px) 230px, (max-width: 799px) calc(84.375rem / 2), (max-width: 1023px) calc(84.375rem / 3), 260px"
            src={episode.thumbnail}
            alt={episodeTitle}
            className="block size-full object-cover"
          />
        </figure>

        <div className="playable-card-duration">{formattedDuration}</div>
      </Link>

      <PlayableCardHoverInfo
        episodeLink={episodeLink}
        episodeTitle={episodeTitle}
        currentSeason={currentSeason}
        episode={episode}
        seriesLink={seriesLink}
        title={title}
      />

      <div className="relative flex flex-1 items-center">
        <div className="playable-card-body flex min-h-[4.3125rem] flex-1 flex-col items-center justify-between py-1 pl-3 sm:min-h-[auto] sm:pt-3 sm:pb-0 sm:pl-0">
          <div className="playable-card-small-title">
            <small>{title}</small>
          </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlayableCardSkeleton: React.FC = () => {
  return (
    <div className="relative flex sm:block">
      <div className="relative block aspect-video h-[5.3125rem] flex-[0_0_auto] bg-[var(--app-overlay-secondary)] sm:h-auto" />

      <div className="relative flex flex-1 items-center">
        <div className="flex min-h-[4.3125rem] flex-1 flex-col py-1 pl-3 sm:min-h-[auto] sm:pt-3 sm:pb-0 sm:pl-0">
          <div className="mb-2.5 h-4.5 w-40 rounded-sm bg-[var(--app-overlay-secondary)]" />
          <div className="h-4 w-24 rounded-sm bg-[var(--app-overlay-secondary)]" />
        </div>
      </div>
    </div>
  );
};

export default PlayableCard;
