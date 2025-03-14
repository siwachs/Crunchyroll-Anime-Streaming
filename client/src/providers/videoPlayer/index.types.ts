import { Dispatch, SetStateAction, ChangeEvent, MouseEvent } from "react";

export type MediaSettingsPanel =
  | "off"
  | "settings"
  | "audioTracks"
  | "subtitleTracks"
  | "qualityLevels";

export type Context = {
  isLoading: boolean;

  autoPlay: boolean;
  toggleAutoPlay: () => void;

  fb10Secs: () => void;

  isMediaPlaying: boolean;
  toggleIsMediaPlaying: () => void;

  ff10Secs: () => void;

  isMediaMute: boolean;
  toggleAudio: () => void;

  isMediaFullscreen: boolean;
  toggleIsMediaFullscreen: () => void;

  elapsedTime: number;
  seekProgressPercentage: number;
  seek: (e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLDivElement>) => void;

  audioTracks: { id: number; name: string }[];
  selectedAudioTrack: number;
  setSelectedAudioTrack: Dispatch<SetStateAction<number>>;

  subtitleTracks: { id: number; name: string }[];
  selectedSubtitleTrack: number;
  setSelectedSubtitleTrack: Dispatch<SetStateAction<number>>;

  qualityLevels: { id: number; height: number }[];
  selectedQuality: string | number;
  setSelectedQuality: Dispatch<SetStateAction<number>>;
  currentLevel: number;

  isMediaSettingsPanelOpen: MediaSettingsPanel;
  setIsMediaSettingsPanelOpen: Dispatch<SetStateAction<MediaSettingsPanel>>;

  switchAudioTrack: (trackId: number) => void;
  switchSubtitleTrack: (trackId: number) => void;
  switchQualityLevel: (qualityLevelId: number) => void;
};
