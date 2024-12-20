import Image from "next/image";

import wideImage from "@/assets/watch/image-wide.jpg";
import "./index.css";

const VideoPlayer: React.FC = () => {
  return (
    <div className="video-player-wrapper">
      <div className="video-player-spacer" />

      <div className="content-wrapper relative w-full">
        <div className="content-wrapper image-wrapper">
          <figure className="relative size-full">
            <Image
              fill
              priority
              sizes="100vw"
              src={wideImage}
              alt="Solo Leveling"
              className="block size-full object-cover"
            />
          </figure>
        </div>

        <div className="content select-none text-center text-xl">
          Video Goes Here
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
