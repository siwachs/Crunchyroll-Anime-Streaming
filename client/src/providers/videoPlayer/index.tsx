"use client";

import {
  ChangeEvent,
  MouseEvent,
  useState,
  useRef,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from "react";
import HLS from "hls.js";

import { Context, MediaSettingsPanel } from "./index.types";

const VideoPlayerContext = createContext<Context | undefined>(undefined);

export function useVideoPlayer() {
  const context = useContext(VideoPlayerContext);
  if (!context)
    throw new Error("useVideoPlayer must be used within VideoPlayerProvider");

  return context;
}

export function VideoPlayerProvider({
  children,
  media,
}: Readonly<{ children: React.ReactNode; media: string }>) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<HLS | null>(null);

  const [autoPlay, setAutoPlay] = useState(false);
  const [isMediaPlaying, setIsMediaPlaying] = useState(false);
  const [isMediaMute, setIsMediaMute] = useState(false);

  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false);

  const [elapsedTime, setElapsedTime] = useState(0);

  const [seekProgressPercentage, setSeekProgressPercentage] = useState(0);

  const [audioTracks, setAudioTracks] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<number>(0);

  const [subtitleTracks, setSubtitleTracks] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] = useState<number>(0);

  const [qualityLevels, setQualityLevels] = useState<
    { id: number; height: number }[]
  >([]);
  const [selectedQuality, setSelectedQuality] = useState<string | number>(
    "Auto",
  );
  const [currentLevel, setCurrentLevel] = useState(360);

  const [isMediaSettingsPanelOpen, setIsMediaSettingsPanelOpen] =
    useState<MediaSettingsPanel>("settings");

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
      hls.nextAutoLevel = -1;

      hls.on(HLS.Events.MANIFEST_PARSED, () => {
        setQualityLevels(
          hls.levels.map((level, index) => ({
            id: index,
            height: level.height,
          })),
        );

        tryAutoPlay();
      });

      hls.on(HLS.Events.AUDIO_TRACKS_UPDATED, () => {
        const tracks = hls.audioTracks.map((track, index) => ({
          id: index,
          name: track.name,
        }));
        setAudioTracks(tracks);

        const defaultTrack = hls.audioTracks.findIndex(
          (track) => track.default,
        );
        setSelectedAudioTrack(defaultTrack !== -1 ? defaultTrack : 0);
      });

      hls.on(HLS.Events.SUBTITLE_TRACKS_UPDATED, () => {
        const tracks = hls.subtitleTracks.map((track, index) => ({
          id: index,
          name: track.name,
        }));
        setSubtitleTracks(tracks);

        const defaultTrack = hls.subtitleTracks.findIndex(
          (track) => track.default,
        );
        setSelectedSubtitleTrack(defaultTrack !== -1 ? defaultTrack : 0);
      });

      hls.on(HLS.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(hls.levels[data.level].height);
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

  function toggleMediaSettingsPanelOpen() {
    setIsMediaSettingsPanelOpen((prev) =>
      prev === "settings" ? "off" : "settings",
    );
  }

  const value = useMemo(
    () => ({
      autoPlay,
      toggleAutoPlay,
      isMediaPlaying,
      toggleIsMediaPlaying,
      isMediaMute,
      toggleAudio,
      isMediaFullscreen,
      toggleIsMediaFullscreen,
      elapsedTime,
      seekProgressPercentage,
      seek,
      audioTracks,
      selectedAudioTrack,
      setSelectedAudioTrack,
      subtitleTracks,
      selectedSubtitleTrack,
      setSelectedSubtitleTrack,
      qualityLevels,
      selectedQuality,
      setSelectedQuality,
      currentLevel,
      isMediaSettingsPanelOpen,
      setIsMediaSettingsPanelOpen,
      toggleMediaSettingsPanelOpen,
    }),
    [
      autoPlay,
      isMediaPlaying,
      isMediaMute,
      isMediaFullscreen,
      elapsedTime,
      seekProgressPercentage,
      audioTracks,
      selectedAudioTrack,
      subtitleTracks,
      selectedSubtitleTrack,
      qualityLevels,
      selectedQuality,
      currentLevel,
      isMediaSettingsPanelOpen,
    ],
  );

  return (
    <VideoPlayerContext.Provider value={value}>
      <div className="video-player relative grid w-full">
        <div className="video-player-sizer pointer-events-none h-[56.25vw] max-h-40 min-h-[calc(20rem*0.5625)]" />

        <div className="relative size-full">
          <video
            ref={videoRef}
            className="video absolute aspect-video size-full"
          />

          {children}
        </div>
      </div>
    </VideoPlayerContext.Provider>
  );
}
