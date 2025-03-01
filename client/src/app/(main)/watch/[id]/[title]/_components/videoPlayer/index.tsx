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
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "./index.css";

const VideoPlayer = ({
  media,
  duration,
}: {
  media: string;
  duration: number;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<HLS | null>(null);

  const [autoPlay, setAutoPlay] = useState(false);
  const [isMediaPlaying, setIsMediaPlaying] = useState(false);
  const [isMediaMute, setIsMediaMute] = useState(false);
  const [isMediaSettingsOpen, setIsMediaSettingsOpen] = useState(true);
  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [seekProgressPercentage, setSeekProgressPercentage] = useState(0);

  const [audioTracks, setAudioTracks] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<number>(0);

  const [subtitles, setSubtitles] = useState<{ id: number; name: string }[]>(
    [],
  );
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] =
    useState<number>(-1);

  const [qualityLevels, setQualityLevels] = useState<
    { id: number; height: number }[]
  >([]);
  const [selectedQuality, setSelectedQuality] = useState<string | number>(
    "Auto",
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    async function tryAutoPlay() {
      if (!video || !autoPlay) return;

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

    if (HLS.isSupported()) {
      const hls = new HLS();
      hlsRef.current = hls;

      hls.loadSource(media);
      hls.attachMedia(video);

      hls.on(HLS.Events.MANIFEST_PARSED, () => {
        setAudioTracks(
          hls.audioTracks.map((track, index) => ({
            id: index,
            name: track.name,
          })),
        );

        if (hls.audioTracks.length > 0) {
        }

        setQualityLevels(
          hls.levels.map((level, index) => ({
            id: index,
            height: level.height,
          })),
        );

        setSubtitles(
          hls.subtitleTracks.map((track, index) => ({
            id: index,
            name: track.name,
          })),
        );

        tryAutoPlay();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = media;

      video.addEventListener("loadedmetadata", () => {
        tryAutoPlay();
      });
    }

    animationFrameId = requestAnimationFrame(updateElapsedTime);

    return () => {
      try {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      } catch (error) {
        console.error("Error while destroying HLS instance:", error);
      }

      if (video) {
        video.removeEventListener("loadedmetadata", tryAutoPlay);
      }

      cancelAnimationFrame(animationFrameId);
    };
  }, [media]);

  function toggleAutoPlay() {
    setAutoPlay((prev) => !prev);
  }

  function toggleIsMediaPlaying() {
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

  function toggleAudio() {
    const video = videoRef.current;
    if (!video) return;

    const isMuted = !video.muted;
    video.muted = isMuted;
    setIsMediaMute(isMuted);
  }

  function toggleIsMediaFullscreen() {
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

  function toggleMediaSettingsOpen() {
    setIsMediaSettingsOpen((prev) => !prev);
  }

  const formattedElapsedTime = timeToFormattedTime(elapsedTime);
  const formattedTotalDuration = timeToFormattedTime(duration);

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
                <div>
                  <button
                    className={`player-action-button ${isMediaSettingsOpen ? "bg-black" : ""}`}
                    onClick={toggleMediaSettingsOpen}
                  >
                    <Image
                      src={SettingsGear}
                      alt="settings"
                      height={24}
                      width={24}
                    />
                  </button>

                  {isMediaSettingsOpen && (
                    <div className="absolute inset-0 z-98">
                      <div className="scrollbar-thin h-52.75 w-93.75 overflow-x-hidden overflow-y-auto bg-black py-2.5">
                        <div className="settings-setting-container">
                          <button
                            onClick={toggleMediaSettingsOpen}
                            className="cursor-pointer"
                          >
                            <FaChevronLeft className="size-4" />
                          </button>

                          <span className="ml-8 text-xl font-semibold">
                            Settings
                          </span>
                        </div>

                        <button
                          onClick={toggleAutoPlay}
                          className="settings-setting-container cursor-pointer justify-between"
                        >
                          <span className="text-base font-semibold">
                            Autoplay
                          </span>

                          <div
                            style={{
                              borderColor: `${autoPlay ? "rgb(40,189,187)" : "rgb(160, 160, 160)"}`,
                            }}
                            className="flex min-h-5 min-w-10 items-center rounded-[10px] border-2 bg-[rgb(25,46,56)]"
                          >
                            <div
                              style={{
                                backgroundColor: `${autoPlay ? "rgb(40,189,187)" : "rgb(160, 160, 160)"}`,
                                transform: `translateX(${autoPlay ? "24px" : "4px"})`,
                              }}
                              className="size-2 rounded-lg transition-transform"
                            />
                          </div>
                        </button>

                        {audioTracks.length > 0 && (
                          <button className="settings-setting-container cursor-pointer justify-between">
                            <span className="text-base font-semibold">
                              Audio
                            </span>

                            <div className="flex items-center">
                              <span className="selected-setting-title">
                                English
                              </span>
                              <FaChevronRight className="ml-2 size-3.5" />
                            </div>
                          </button>
                        )}

                        {subtitles.length > 0 && (
                          <button className="settings-setting-container cursor-pointer justify-between">
                            <span className="text-base font-semibold">
                              Subtitles/CC
                            </span>

                            <div className="flex items-center">
                              <span className="selected-setting-title">
                                English
                              </span>
                              <FaChevronRight className="ml-2 size-3.5" />
                            </div>
                          </button>
                        )}

                        {qualityLevels.length > 0 && (
                          <button className="settings-setting-container cursor-pointer justify-between">
                            <span className="text-base font-semibold">
                              Quality
                            </span>

                            <div className="flex items-center">
                              <span className="selected-setting-title">
                                Auto
                              </span>
                              <span className="ml-1 text-xs text-[rgb(160,160,160)]">
                                1080p
                              </span>
                              <FaChevronRight className="ml-2 size-3.5" />
                            </div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

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
      </div>
    </div>
  );
};

export default VideoPlayer;
