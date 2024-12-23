import Link from "next/link";

import PlayableCard from "@/components/playableCard";

import playableCardMiniWideImage from "@/assets/watch/playable-card-mini-image-wide.avif";
import "./index.css";

const Videos: React.FC = () => {
  return (
    <div className="videos-wrapper">
      <div className="watch-more-episodes">
        <div className="prev-next-episodes">
          <div className="prev-next-episode">
            <Link
              className="title text-sm/leading-4.5 font-medium"
              href={`/watch/398489/${encodeURIComponent("Gloria".toLowerCase().replaceAll(" ", "-"))}`}
            >
              <span>Next Episode</span>
            </Link>

            <PlayableCard
              episodeNumber={3}
              thumbnail={playableCardMiniWideImage}
              duration="23m"
              title="It's Like a Game"
              metaTags="Sub | Dub"
              playableCardMini
            />
          </div>

          <div className="prev-next-episode">
            <Link
              className="title text-sm/leading-4.5 font-medium"
              href={`/watch/398489/${encodeURIComponent("Conspiracy".toLowerCase().replaceAll(" ", "-"))}`}
            >
              <span>Previous Episode</span>
            </Link>

            <PlayableCard
              episodeNumber={1}
              thumbnail={playableCardMiniWideImage}
              duration="23m"
              title="I'm Used to It"
              metaTags="Sub | Dub"
              playableCardMini
            />
          </div>
        </div>

        <button></button>
      </div>
    </div>
  );
};

export default Videos;
