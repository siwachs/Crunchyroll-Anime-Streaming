import { useVideoPlayer } from "@/providers/videoPlayer";

import { FaChevronLeft } from "react-icons/fa6";
import { RadioUnselect, RadioSelect } from "@/assets/icons";

const QualityLevels: React.FC = () => {
  const {
    setIsMediaSettingsPanelOpen,
    qualityLevels,
    selectedQuality,
    switchQualityLevel,
  } = useVideoPlayer();

  function closeQualityLevels() {
    setIsMediaSettingsPanelOpen("settings");
  }

  return (
    <>
      <div className="subtitles-setting-container">
        <button onClick={closeQualityLevels} className="cursor-pointer">
          <FaChevronLeft className="size-4" />
        </button>

        <span className="ml-8 text-xl font-semibold">Quality</span>
      </div>

      <button
        onClick={() => switchQualityLevel(-1)}
        className="subtitles-setting-container setting-button cursor-pointer"
      >
        {selectedQuality === -1 ? (
          <RadioSelect className="mr-8 size-5" />
        ) : (
          <RadioUnselect className="mr-8 size-5" />
        )}
        <div className="max-w-62.5">
          <span className="line-clamp-1 text-base">Auto</span>
        </div>
      </button>

      {qualityLevels.map((qualityLevel) => (
        <button
          key={qualityLevel.id}
          onClick={() => switchQualityLevel(qualityLevel.id)}
          className="subtitles-setting-container setting-button cursor-pointer"
        >
          {qualityLevel.id === selectedQuality ? (
            <RadioSelect className="mr-8 size-5" />
          ) : (
            <RadioUnselect className="mr-8 size-5" />
          )}
          <div className="max-w-62.5">
            <span className="line-clamp-1 text-base">
              {qualityLevel.height}p
            </span>
          </div>
        </button>
      ))}
    </>
  );
};

export default QualityLevels;
