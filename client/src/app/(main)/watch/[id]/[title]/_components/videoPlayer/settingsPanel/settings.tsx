import { useVideoPlayer } from "@/providers/videoPlayer";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Settings: React.FC = () => {
  const {
    autoPlay,
    toggleAutoPlay,
    audioTracks,
    selectedAudioTrack,
    subtitleTracks,
    selectedSubtitleTrack,
    qualityLevels,
    selectedQuality,
    currentLevel,
    setIsMediaSettingsPanelOpen,
  } = useVideoPlayer();

  function closeSettingsPanel() {
    setIsMediaSettingsPanelOpen("off");
  }

  function openAudio() {
    setIsMediaSettingsPanelOpen("audioTracks");
  }

  function openSubtitles() {
    setIsMediaSettingsPanelOpen("subtitleTracks");
  }

  function openQualityLevels() {
    setIsMediaSettingsPanelOpen("qualityLevels");
  }

  return (
    <>
      <div className="settings-setting-container">
        <button onClick={closeSettingsPanel} className="cursor-pointer">
          <FaChevronLeft className="size-4" />
        </button>

        <span className="ml-8 text-xl font-semibold">Settings</span>
      </div>

      <button
        onClick={toggleAutoPlay}
        className="settings-setting-container setting-button cursor-pointer justify-between"
      >
        <span className="text-base font-semibold">Autoplay</span>

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

      {audioTracks.length > 1 && (
        <button
          onClick={openAudio}
          className="settings-setting-container setting-button cursor-pointer justify-between"
        >
          <span className="text-base font-semibold">Audio</span>

          <div className="flex items-center">
            <span className="selected-setting-title">
              {audioTracks[selectedAudioTrack]?.name || "None"}
            </span>
            <FaChevronRight className="ml-2 size-3.5" />
          </div>
        </button>
      )}

      {subtitleTracks.length > 1 && (
        <button
          onClick={openSubtitles}
          className="settings-setting-container setting-button cursor-pointer justify-between"
        >
          <span className="text-base font-semibold">Subtitles/CC</span>

          <div className="flex items-center">
            <span className="selected-setting-title">
              {subtitleTracks[selectedSubtitleTrack]?.name || "None"}
            </span>
            <FaChevronRight className="ml-2 size-3.5" />
          </div>
        </button>
      )}

      {qualityLevels.length > 1 && (
        <button
          onClick={openQualityLevels}
          className="settings-setting-container setting-button cursor-pointer justify-between"
        >
          <span className="text-base font-semibold">Quality</span>

          <div className="flex items-center">
            {selectedQuality === -1 && (
              <span className="selected-setting-title">Auto</span>
            )}
            <span className="ml-1 text-xs text-[rgb(160,160,160)]">
              {currentLevel}p
            </span>
            <FaChevronRight className="ml-2 size-3.5" />
          </div>
        </button>
      )}
    </>
  );
};

export default Settings;
