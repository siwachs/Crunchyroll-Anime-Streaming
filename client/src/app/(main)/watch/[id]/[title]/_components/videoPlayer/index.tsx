"use client";

import Image from "next/image";
import { useRef, useState, useEffect, ChangeEvent, MouseEvent } from "react";
import HLS from "hls.js";

import { timeToFormattedTime } from "@/lib/utils";

import { FaPlay, FaPause } from "react-icons/fa";
import {
  SpeakerWave,
  SpeakerWaveMute,
  SettingsGear,
  Expand,
  Contract,
} from "@/assets/imageDataURLs";

import "./index.css";

const VideoPlayer = ({ media }: { media: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMediaPlaying, setIsMediaPlaying] = useState(false);
  const [isMediaMute, setIsMediaMute] = useState(false);
  const [isMediaSettingsOpen, setIsMediaSettingsOpen] = useState(false);
  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false);

  const [totalDuration, setTotalDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const [seekProgressPercentage, setSeekProgressPercentage] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: HLS | null = null;
    let animationFrameId: number;

    async function tryAutoPlay() {
      if (!video) return;

      try {
        await video.play();
        setIsMediaPlaying(true);
      } catch (error) {
        console.warn("Autoplay is restricted in this browser.");
        setIsMediaPlaying(false);
      }
    }

    function updateElapsedTime() {
      if (!video) return;

      setElapsedTime(video.currentTime);
      setSeekProgressPercentage(
        video.duration ? (video.currentTime / video.duration) * 100 : 0,
      );

      animationFrameId = requestAnimationFrame(updateElapsedTime);
    }

    function setVideoDuration() {
      if (!video) return;
      setTotalDuration(video.duration);
    }

    if (HLS.isSupported()) {
      hls = new HLS();
      hls.loadSource(media);
      hls.attachMedia(video);

      hls.on(HLS.Events.MANIFEST_PARSED, tryAutoPlay);
      hls.on(HLS.Events.LEVEL_LOADED, setVideoDuration);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = media;

      video.addEventListener("loadedmetadata", () => {
        tryAutoPlay();
        setVideoDuration();
      });
    }

    animationFrameId = requestAnimationFrame(updateElapsedTime);

    return () => {
      if (hls) hls.destroy();
      if (video) {
        video.removeEventListener("loadedmetadata", tryAutoPlay);
      }

      cancelAnimationFrame(animationFrameId);
    };
  }, [media]);

  function toogleIsMediaPlaying() {
    if (!videoRef.current) return;

    if (isMediaPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsMediaPlaying((prev) => !prev);
  }

  function seek(e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) {
    const video = videoRef.current;
    if (!video) return;

    function getSeekPecentage() {
      if ("target" in e && e.target instanceof HTMLInputElement) {
        return Number(e.target.value);
      } else if ("clientX" in e) {
        const rect = (
          e.currentTarget as HTMLDivElement
        ).getBoundingClientRect();
        return ((e.clientX - rect.left) / rect.width) * 100;
      }

      return 0;
    }

    const percentage = getSeekPecentage();
    setSeekProgressPercentage(percentage);

    const newTime = video.duration ? (percentage / 100) * video.duration : 0;
    video.currentTime = newTime;
  }

  function toogleAudio() {
    const video = videoRef.current;
    if (!video) return;

    const isMuted = !video.muted;
    video.muted = isMuted;
    setIsMediaMute(isMuted);
  }

  function toogleMediaFullscreen() {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen?.();
      setIsMediaFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsMediaFullscreen(false);
    }
  }

  function toogleMediaSettingsOpen() {
    setIsMediaSettingsOpen((prev) => !prev);
  }

  const formattedElapsedTime = timeToFormattedTime(elapsedTime);
  const formattedTotalDuration = timeToFormattedTime(totalDuration);

  return (
    <div className="video-player relative grid w-full">
      <div className="video-player-sizer pointer-events-none h-[56.25vw] max-h-40 min-h-[calc(20rem*0.5625)]" />

      <div className="relative size-full">
        <video
          ref={videoRef}
          className="video absolute aspect-video size-full"
        />

        <div className="controls absolute inset-0">
          <div className="relative size-full">
            <div className="absolute top-0 right-0 left-0 flex h-10 justify-between px-1.5">
              <button onClick={toogleAudio} className="player-action-button">
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
                <div className="relative">
                  <button
                    className={`player-action-button ${isMediaSettingsOpen ? "bg-black" : ""}`}
                    onClick={toogleMediaSettingsOpen}
                  >
                    <Image
                      src={SettingsGear}
                      alt="settings"
                      height={24}
                      width={24}
                    />
                  </button>
                </div>

                <button
                  onClick={toogleMediaFullscreen}
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
                    <Image
                      src={Expand}
                      alt="expand-media"
                      height={24}
                      width={24}
                    />
                  )}
                </button>
              </div>
            </div>

            <button
              onClick={toogleIsMediaPlaying}
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
      </div>
    </div>
  );
};

export default VideoPlayer;
