"use client";

import Image from "next/image";

import { useVideoPlayer } from "@/providers/videoPlayer";
import { timeToFormattedTime } from "@/lib/utils";

import SettingsPanel from "./settingsPanel";

import { Loader } from "@/assets/icons";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  FB10Secs,
  FF10Secs,
  SpeakerWave,
  SpeakerWaveMute,
  Expand,
  Contract,
} from "@/assets/imageDataURLs";

import "./index.css";

const VideoPlayer: React.FC<{ duration: number }> = ({ duration }) => {
  const {
    isLoading,
    elapsedTime,
    toggleAudio,
    isMediaMute,
    fb10Secs,
    toggleIsMediaFullscreen,
    ff10Secs,
    isMediaFullscreen,
    toggleIsMediaPlaying,
    isMediaPlaying,
    seek,
    seekProgressPercentage,
  } = useVideoPlayer();

  const formattedElapsedTime = timeToFormattedTime(elapsedTime);
  const formattedTotalDuration = timeToFormattedTime(duration);

  return (
    <div className="controls absolute inset-0 bg-black/60">
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

        <div className="absolute top-1/2 left-1/2 flex w-[74.6667%] -translate-x-1/2 -translate-y-1/2 justify-evenly self-center">
          {isLoading ? (
            <Loader className="size-12" />
          ) : (
            <>
              <button onClick={fb10Secs} className="size-10 cursor-pointer">
                <Image
                  src={FB10Secs}
                  alt="fb-10-secs"
                  height={24}
                  width={24}
                  className="size-full"
                />
              </button>

              <button
                onClick={toggleIsMediaPlaying}
                className="size-10 cursor-pointer"
              >
                {isMediaPlaying ? (
                  <FaPause className="size-full" />
                ) : (
                  <FaPlay className="size-full" />
                )}
              </button>

              <button onClick={ff10Secs} className="size-10 cursor-pointer">
                <Image
                  src={FF10Secs}
                  alt="ff-10-secs"
                  height={24}
                  width={24}
                  className="size-full"
                />
              </button>
            </>
          )}
        </div>

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
