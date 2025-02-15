import Link from "next/link";

import PlayableCard from "@/components/playableCard";
import ActionButton from "@/components/contentActionButtons/actionButton";

import { HiInboxStack } from "react-icons/hi2";

import playableCardMiniWideImage from "@/assets/watch/playable-card-mini-image-wide.avif";
import "./index.css";

const Videos: React.FC = () => {
  const nextEpisodeLink = `/watch/398489/${encodeURIComponent("Gloria".toLowerCase().replaceAll(" ", "-"))}`;
  const previousEpisodeLink = `/watch/398489/${encodeURIComponent("Conspiracy".toLowerCase().replaceAll(" ", "-"))}`;

  return (
    <div className="videos-wrapper">
      <div className="watch-more-episodes">
        <div className="prev-next-episodes">
          <div className="prev-next-episode 2sm:order-1 2md:order-none">
            <Link
              className="title 2sm:text-end 2md:text-start text-sm/4.5 font-medium"
              href={nextEpisodeLink}
            >
              <span>Next Episode</span>
            </Link>

            <PlayableCard
              episodeNumber={3}
              thumbnail={playableCardMiniWideImage}
              duration="23m"
              title="It's Like a Game"
              metaTags="Sub | Dub"
              cardType="mini"
            />
          </div>

          <div className="prev-next-episode">
            <Link
              className="title text-sm/4.5 font-medium"
              href={previousEpisodeLink}
            >
              <span>Previous Episode</span>
            </Link>

            <PlayableCard
              episodeNumber={1}
              thumbnail={playableCardMiniWideImage}
              duration="23m"
              title="I'm Used to It"
              metaTags="Sub | Dub"
              cardType="mini"
            />
          </div>
        </div>

        <ActionButton
          Icon={<HiInboxStack className="size-5" />}
          text="See More Episodes"
          className="action-button-shadow text-[var(--app-icon-primary)] hover:text-white focus-visible:text-white sm:w-auto"
          shadow="action-button-shadow"
        />
      </div>
    </div>
  );
};

export default Videos;
