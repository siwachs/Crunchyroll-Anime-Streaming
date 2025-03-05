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

import "@/app/(main)/watch/[id]/[title]/_components/videoPlayer/index.css";

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
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initlizedPlayerRef = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);

  const [autoPlay, setAutoPlay] = useState(true);
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
  const [selectedSubtitleTrack, setSelectedSubtitleTrack] =
    useState<number>(-1);

  const [qualityLevels, setQualityLevels] = useState<
    { id: number; height: number }[]
  >([]);
  const [selectedQuality, setSelectedQuality] = useState<number>(-1);
  const [currentLevel, setCurrentLevel] = useState(360);

  const [isMediaSettingsPanelOpen, setIsMediaSettingsPanelOpen] =
    useState<MediaSettingsPanel>("off");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    function play() {
      setIsMediaPlaying(true);
    }

    function pause() {
      setIsMediaPlaying(false);
    }

    function waiting() {
      setIsLoading(true);
    }

    function canPlay() {
      setIsLoading(false);

      if (!initlizedPlayerRef.current) {
        initlizedPlayerRef.current = true;
        hideControls();
      }
    }

    function seeking() {
      setIsLoading(true);
    }

    function seeked() {
      setIsLoading(false);
    }

    function toggleFullscreen() {
      setIsMediaFullscreen(document.fullscreenElement === video);
    }

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
          hls.levels
            .map((level, index) => ({
              id: index,
              height: level.height,
            }))
            .sort((a, b) => b.height - a.height),
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

    video.addEventListener("play", play);
    video.addEventListener("pause", pause);

    video.addEventListener("waiting", waiting);
    video.addEventListener("canplay", canPlay);
    video.addEventListener("canplaythrough", canPlay);
    video.addEventListener("seeking", seeking);
    video.addEventListener("seeked", seeked);

    video.addEventListener("fullscreenchange", toggleFullscreen);

    animationFrameId = requestAnimationFrame(updateElapsedTime);

    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;

      if (video) {
        video.removeEventListener("loadedmetadata", tryAutoPlay);

        video.removeEventListener("play", play);
        video.removeEventListener("pause", pause);

        video.removeEventListener("waiting", waiting);
        video.removeEventListener("canplay", canPlay);
        video.removeEventListener("canplaythrough", canPlay);
        video.removeEventListener("seeking", seeking);
        video.removeEventListener("seeked", seeked);

        video.removeEventListener("fullscreenchange", toggleFullscreen);
      }

      cancelAnimationFrame(animationFrameId);
    };
  }, [media]);

  // Stale State Managment
  const isLoadingRef = useRef(true);
  const isMediaPlayingRef = useRef(false);
  const isMediaSettingsPanelOpenRef = useRef<MediaSettingsPanel>("off");
  useEffect(() => {
    isLoadingRef.current = isLoading;
    isMediaPlayingRef.current = isMediaPlaying;
    isMediaSettingsPanelOpenRef.current = isMediaSettingsPanelOpen;
  }, [isLoading, isMediaPlaying, isMediaSettingsPanelOpen]);

  // Update Que Position
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const selectedTrack = video.textTracks[selectedSubtitleTrack];
    if (!selectedTrack?.cues) return;

    const cues = selectedTrack.cues;
    for (const cue of cues) {
      if (cue instanceof VTTCue) {
        cue.line = showControls ? -3 : "auto";
      }
    }
  }, [showControls, selectedSubtitleTrack]);

  function toggleAutoPlay() {
    setAutoPlay((prev) => !prev);
  }

  function fb10Secs() {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.max(video.currentTime - 10, 0);
    video.currentTime = newTime;

    setElapsedTime(newTime);
    setSeekProgressPercentage((newTime / video.duration) * 100);
  }

  async function toggleIsMediaPlaying() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) await video.play();
    else video.pause();
  }

  function ff10Secs() {
    const video = videoRef.current;
    if (!video) return;

    const newTime = Math.min(video.currentTime + 10, video.duration);
    video.currentTime = newTime;

    setElapsedTime(newTime);
    setSeekProgressPercentage((newTime / video.duration) * 100);
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

    if (!document.fullscreenElement) video.requestFullscreen?.();
    else document.exitFullscreen?.();
  }

  function switchAudioTrack(trackId: number) {
    const hls = hlsRef.current;
    if (!hls) return;

    hls.audioTrack = trackId;
    setSelectedAudioTrack(trackId);
    setIsMediaSettingsPanelOpen("off");
  }

  function switchSubtitleTrack(trackId: number) {
    const hls = hlsRef.current;
    if (!hls) return;

    hls.subtitleTrack = trackId;
    setSelectedSubtitleTrack(trackId);
    setIsMediaSettingsPanelOpen("off");
  }

  function switchQualityLevel(qualityLevelId: number) {
    const hls = hlsRef.current;
    if (!hls) return;

    hls.currentLevel = qualityLevelId;
    setSelectedQuality(qualityLevelId);
    setIsMediaSettingsPanelOpen("off");
  }

  function showControlsOnMouseEnter() {
    setShowControls(true);
  }

  function hideControls() {
    setShowControls(
      !(
        !isLoadingRef.current &&
        isMediaPlayingRef.current &&
        isMediaSettingsPanelOpenRef.current === "off"
      ),
    );
  }

  function showControlsOnTouch() {
    setShowControls(true);

    if (hideControlsTimeoutRef.current)
      clearTimeout(hideControlsTimeoutRef.current);

    hideControlsTimeoutRef.current = setTimeout(hideControls, 3000);
  }

  const value = useMemo(
    () => ({
      isLoading,
      autoPlay,
      toggleAutoPlay,
      fb10Secs,
      isMediaPlaying,
      toggleIsMediaPlaying,
      ff10Secs,
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
      switchAudioTrack,
      switchSubtitleTrack,
      switchQualityLevel,
    }),
    [
      isLoading,
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
      <div
        onMouseEnter={showControlsOnMouseEnter}
        onMouseLeave={hideControls}
        onTouchStart={showControlsOnTouch}
        className="video-player relative grid w-full"
      >
        <div className="video-player-sizer pointer-events-none" />

        <div className="relative size-full">
          <video
            ref={videoRef}
            className="video absolute aspect-video size-full"
            controls={isMediaFullscreen}
          />

          {(showControls || isLoading) && children}
        </div>
      </div>
    </VideoPlayerContext.Provider>
  );
}
