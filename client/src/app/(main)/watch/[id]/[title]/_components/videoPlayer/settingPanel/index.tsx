import { useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { SettingsGear } from "@/assets/imageDataURLs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "./index.css";

const SettingsPanel: React.FC<{
  autoPlay: boolean;
  setAutoPlay: Dispatch<SetStateAction<boolean>>;
}> = ({ autoPlay, setAutoPlay }) => {
  const [isMediaSettingsPanelOpen, setIsMediaSettingsPanelOpen] = useState<
    "off" | "settings" | "audioTracks" | "subtitleTracks" | "qualityLevels"
  >("settings");

  function toggleMediaSettingsOpen() {
    setIsMediaSettingsPanelOpen((prev) =>
      prev === "settings" ? "off" : "settings",
    );
  }

  function toggleAutoPlay() {
    setAutoPlay((prev) => !prev);
  }

  return (
    <div className="relative">
      <button
        className={`player-action-button ${isMediaSettingsPanelOpen !== "off" ? "bg-black" : ""}`}
        onClick={toggleMediaSettingsOpen}
      >
        <Image src={SettingsGear} alt="settings" height={24} width={24} />
      </button>

      {isMediaSettingsPanelOpen !== "off" && (
        <div className="absolute top-full right-0 left-auto z-100">
          <div className="scrollbar-thin h-27.75 w-80 overflow-x-hidden overflow-y-auto bg-black py-2.5">
            <div className="settings-setting-container">
              <button
                onClick={toggleMediaSettingsOpen}
                className="cursor-pointer"
              >
                <FaChevronLeft className="size-4" />
              </button>

              <span className="ml-8 text-xl font-semibold">Settings</span>
            </div>

            <button
              onClick={toggleAutoPlay}
              className="settings-setting-container cursor-pointer justify-between"
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

            {audioTracks.length > 0 && (
              <button className="settings-setting-container cursor-pointer justify-between">
                <span className="text-base font-semibold">Audio</span>

                <div className="flex items-center">
                  <span className="selected-setting-title">
                    {audioTracks[selectedAudioTracks].name}
                  </span>
                  <FaChevronRight className="ml-2 size-3.5" />
                </div>
              </button>
            )}

            {subtitleTracks.length > 0 && (
              <button className="settings-setting-container cursor-pointer justify-between">
                <span className="text-base font-semibold">Subtitles/CC</span>

                <div className="flex items-center">
                  <span className="selected-setting-title">
                    {subtitleTracks[selectedSubtitleTrack].name}
                  </span>
                  <FaChevronRight className="ml-2 size-3.5" />
                </div>
              </button>
            )}

            {qualityLevels.length > 0 && (
              <button className="settings-setting-container cursor-pointer justify-between">
                <span className="text-base font-semibold">Quality</span>

                <div className="flex items-center">
                  {selectedQuality === "Auto" && (
                    <span className="selected-setting-title">Auto</span>
                  )}
                  <span className="ml-1 text-xs text-[rgb(160,160,160)]">
                    {currentLevel}p
                  </span>
                  <FaChevronRight className="ml-2 size-3.5" />
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
