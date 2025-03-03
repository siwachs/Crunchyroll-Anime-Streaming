import { useVideoPlayer } from "@/providers/videoPlayer";

import { FaChevronLeft } from "react-icons/fa6";
import { RadioUnselect, RadioSelect } from "@/assets/icons";

const Audio: React.FC = () => {
  const {
    setIsMediaSettingsPanelOpen,
    audioTracks,
    selectedAudioTrack,
    switchAudioTrack,
  } = useVideoPlayer();

  function closeAudio() {
    setIsMediaSettingsPanelOpen("settings");
  }

  return (
    <>
      <div className="audio-setting-container">
        <button onClick={closeAudio} className="cursor-pointer">
          <FaChevronLeft className="size-4" />
        </button>

        <span className="ml-8 text-xl font-semibold">Audio</span>
      </div>

      {audioTracks.map((audioTrack) => (
        <button
          key={audioTrack.id}
          onClick={() => switchAudioTrack(audioTrack.id)}
          className="audio-setting-container cursor-pointer"
        >
          {audioTrack.id === selectedAudioTrack ? (
            <RadioSelect className="mr-8 size-5" />
          ) : (
            <RadioUnselect className="mr-8 size-5" />
          )}
          <div className="max-w-62.5">
            <span className="line-clamp-1 text-base">{audioTrack.name}</span>
          </div>
        </button>
      ))}

      <button
        onClick={() => switchAudioTrack(-1)}
        className="subtitles-setting-container cursor-pointer"
      >
        {selectedAudioTrack === -1 ? (
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

export default Audio;
