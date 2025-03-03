import Image from "next/image";

import { useVideoPlayer } from "@/providers/videoPlayer";

import Settings from "./settings";
import Audio from "./audio";
import Subtitles from "./subtitles";
import QualityLevels from "./qualityLevels";

import { SettingsGear } from "@/assets/imageDataURLs";

import "./index.css";

const SettingsPanel: React.FC = () => {
  const { isMediaSettingsPanelOpen, setIsMediaSettingsPanelOpen } =
    useVideoPlayer();

  function toggleMediaSettingsPanelOpen() {
    setIsMediaSettingsPanelOpen((prev) =>
      prev === "settings" ? "off" : "settings",
    );
  }

  return (
    <div className="relative">
      <button
        className={`player-action-button ${isMediaSettingsPanelOpen !== "off" ? "bg-black" : ""}`}
        onClick={toggleMediaSettingsPanelOpen}
      >
        <Image src={SettingsGear} alt="settings" height={24} width={24} />
      </button>

      {isMediaSettingsPanelOpen !== "off" && (
        <div className="absolute top-full right-0 left-auto z-98">
          <div className="scrollbar-thin h-27.75 w-80 overflow-x-hidden overflow-y-auto bg-black py-2.5">
            {isMediaSettingsPanelOpen === "settings" && <Settings />}
            {isMediaSettingsPanelOpen === "audioTracks" && <Audio />}
            {isMediaSettingsPanelOpen === "subtitleTracks" && <Subtitles />}
            {isMediaSettingsPanelOpen === "qualityLevels" && <QualityLevels />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
