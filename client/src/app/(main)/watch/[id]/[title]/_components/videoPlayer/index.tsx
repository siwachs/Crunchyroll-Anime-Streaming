"use client";

import Image from "next/image";

import { useVideoPlayer } from "@/providers/videoPlayer";
import { timeToFormattedTime } from "@/lib/utils";

import { FaPlay, FaPause } from "react-icons/fa";
import {
  SpeakerWave,
  SpeakerWaveMute,
  Expand,
  Contract,
} from "@/assets/imageDataURLs";

import "./index.css";
import SettingsPanel from "./settingsPanel";

const VideoPlayer: React.FC<{ duration: number }> = ({ duration }) => {
  const {
    elapsedTime,
    toggleAudio,
    isMediaMute,
    toggleIsMediaFullscreen,
    isMediaFullscreen,
    toggleIsMediaPlaying,
    isMediaPlaying,
    seek,
    seekProgressPercentage,
  } = useVideoPlayer();

  const formattedElapsedTime = timeToFormattedTime(elapsedTime);
  const formattedTotalDuration = timeToFormattedTime(duration);

  return (
    <div className="controls absolute inset-0">
      <div className="relative size-full">
        <div className="absolute top-0 right-0 left-0 flex h-10 justify-between px-1.5">
          <button onClick={toggleAudio} className="player-action-button">
            {isMediaMute ? (
              <Image
                src={SpeakerWaveMute}
                alt="unmute"
                height={24}
                width={24}
              />
            ) : (
              <Image src={SpeakerWave} alt="mute" height={24} width={24} />
            )}
          </button>

          <div className="flex">
            <SettingsPanel />

            <button
              onClick={toggleIsMediaFullscreen}
              className="player-action-button"
            >
              {isMediaFullscreen ? (
                <Image
                  src={Contract}
                  alt="contract-media"
                  height={24}
                  width={24}
                />
              ) : (
                <Image src={Expand} alt="expand-media" height={24} width={24} />
              )}
            </button>
          </div>
        </div>

        <button
          onClick={toggleIsMediaPlaying}
          className="absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          {isMediaPlaying ? (
            <FaPause className="size-full" />
          ) : (
            <FaPlay className="size-full" />
          )}
        </button>

        <div className="duration-and-seek absolute right-0 bottom-0 left-0 px-4">
          <div className="duration flex justify-between text-xs font-semibold">
            <span>{formattedElapsedTime}</span>
            <span>{formattedTotalDuration}</span>
          </div>

          <div
            tabIndex={0}
            role="button"
            onKeyDown={undefined}
            className="flex min-h-6 cursor-pointer items-center"
            onClick={seek}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={seekProgressPercentage}
              onChange={seek}
              className="seek"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
