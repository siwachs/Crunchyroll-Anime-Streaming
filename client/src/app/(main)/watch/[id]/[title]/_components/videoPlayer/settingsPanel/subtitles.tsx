import { useVideoPlayer } from "@/providers/videoPlayer";

import { FaChevronLeft } from "react-icons/fa6";
import { RadioUnselect, RadioSelect } from "@/assets/icons";

const Subtitles: React.FC = () => {
  const {
    setIsMediaSettingsPanelOpen,
    subtitleTracks,
    selectedSubtitleTrack,
    switchSubtitleTrack,
  } = useVideoPlayer();

  function closeSubtitles() {
    setIsMediaSettingsPanelOpen("settings");
  }

  return (
    <>
      <div className="subtitles-setting-container">
        <button onClick={closeSubtitles} className="cursor-pointer">
          <FaChevronLeft className="size-4" />
        </button>

        <span className="ml-8 text-xl font-semibold">Subtitles/CC</span>
      </div>

      {subtitleTracks.map((subtitleTrack) => (
        <button
          key={subtitleTrack.id}
          onClick={() => switchSubtitleTrack(subtitleTrack.id)}
          className="subtitles-setting-container setting-button cursor-pointer"
        >
          {subtitleTrack.id === selectedSubtitleTrack ? (
            <RadioSelect className="mr-8 size-5" />
          ) : (
            <RadioUnselect className="mr-8 size-5" />
          )}
          <div className="max-w-62.5">
            <span className="line-clamp-1 text-base">{subtitleTrack.name}</span>
          </div>
        </button>
      ))}

      <button
        onClick={() => switchSubtitleTrack(-1)}
        className="subtitles-setting-container setting-button cursor-pointer"
      >
        {selectedSubtitleTrack === -1 ? (
          <RadioSelect className="mr-8 size-5" />
        ) : (
          <RadioUnselect className="mr-8 size-5" />
        )}
        <div className="max-w-62.5">
          <span className="line-clamp-1 text-base">None</span>
        </div>
      </button>
    </>
  );
};

export default Subtitles;
