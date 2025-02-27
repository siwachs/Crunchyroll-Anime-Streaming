import Link from "next/link";
import Image from "next/image";

import {
  cleanString,
  getTitleWithSeasonAndEpisodeNumber,
  secondsToFormattedSeconds,
} from "@/lib/utils";

import { EpisodeCardMini } from "@/app/(main)/watch/[id]/[title]/page.types";

import "./common.css";
import "./playableCardMini.css";

const PlayableCardMini: React.FC<{ episode: EpisodeCardMini }> = ({
  episode,
}) => {
  const episodeLink = `/watch/${episode.id}/${cleanString(episode.title)}`;

  const episodeTitle = getTitleWithSeasonAndEpisodeNumber(
    episode.season ?? -1,
    episode.episode,
    episode.title,
  );

  const formattedDuration = secondsToFormattedSeconds(episode.duration);

  return (
    <div className="playable-card-mini app-transition-colors relative flex">
      <Link
        href={episodeLink}
        prefetch={false}
        title={episodeTitle}
        className="absolute inset-0 z-[2]"
      />

      <Link
        href={episodeLink}
        prefetch={false}
        tabIndex={-1}
        className="playable-card-mini-thumbnail-wrapper relative block aspect-video h-[5.3125rem] flex-[0_0_auto]"
      >
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
      </Link>

      <div className="relative flex flex-1 items-center">
        <div className="playable-card-mini-body flex min-h-[4.3125rem] flex-1 flex-col items-center justify-between py-1 pl-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayableCardMini;
