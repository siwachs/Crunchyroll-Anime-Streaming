"use client";

import { useRef, useState } from "react";

import { FaPlay, FaPause } from "react-icons/fa";

import "./index.css";

const VideoPlayer = ({ media }: { media: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMediaPlaying, setIsMediaPlaying] = useState(false);

  function toogleIsMediaPlaying() {
    setIsMediaPlaying((prev) => !prev);
  }

  return (
    <div className="video-player relative grid w-full">
      <div className="video-player-sizer pointer-events-none h-[56.25vw] max-h-40 min-h-[calc(20rem*0.5625)]" />

      <div className="relative size-full">
        <video ref={videoRef} className="video absolute size-full" />

        <div className="controls absolute size-full">
          <button
            className="pause-or-play absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white"
            onClick={toogleIsMediaPlaying}
          >
            {isMediaPlaying ? (
              <FaPause className="size-12" />
            ) : (
              <FaPlay className="size-12" />
            )}
          </button>

          <div className="duration-and-seek absolute right-0 bottom-0 left-0 px-5 py-2.5">
            <div className="duration mb-3 flex items-center justify-between text-xs">
              <span>00:00</span>
              <span>00:00</span>
            </div>

            <div className="seek relative h-0.5 bg-[var(--meta-color)]">
              <input
                min="0"
                type="range"
                className="seek-progress h-full bg-[var(--app-background-crunchyroll-orange)]"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
