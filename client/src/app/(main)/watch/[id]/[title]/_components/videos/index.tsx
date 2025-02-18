import Link from "next/link";

import { cleanString } from "@/lib/utils";

import PlayableCardMini from "@/components/playableCard/playableCardMini";

import { EpisodeCardMini } from "../../page.types";

import "./index.css";

const Videos: React.FC<{
  prevEpisode: EpisodeCardMini | null;
  nextEpisode: EpisodeCardMini | null;
}> = ({ prevEpisode, nextEpisode }) => {
  const nextEpisodeLink = nextEpisode
    ? `/watch/${nextEpisode.id}/${cleanString(nextEpisode.title)}`
    : null;
  const previousEpisodeLink = prevEpisode
    ? `/watch/${prevEpisode.id}/${cleanString(prevEpisode.title)}`
    : null;

  return (
    <div className="videos-wrapper 2md:w-[22.9375rem] 2md:pl-10">
      <div className="watch-more-episodes relative mb-10">
        <div className="prev-next-episodes 2sm:grid-flow-col 2md:grid-auto-flow-unset mb-6 grid auto-rows-fr gap-x-10 gap-y-6">
          {nextEpisodeLink && nextEpisode && (
            <div className="prev-next-episode 2sm:order-1 2md:order-none">
              <Link
                className="title 2sm:text-end 2md:text-start text-sm/4.5 font-medium"
                href={nextEpisodeLink}
              >
                <span>Next Episode</span>
              </Link>

              <PlayableCardMini episode={nextEpisode} />
            </div>
          )}

          {previousEpisodeLink && prevEpisode && (
            <div className="prev-next-episode">
              <Link
                className="title text-sm/4.5 font-medium"
                href={previousEpisodeLink}
              >
                <span>Previous Episode</span>
              </Link>

              <PlayableCardMini episode={prevEpisode} />
            </div>
          )}
        </div>

        {/* See More Episodes Button */}
      </div>
    </div>
  );
};

export default Videos;
