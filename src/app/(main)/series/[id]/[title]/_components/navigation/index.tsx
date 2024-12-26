import TopControls from "./topControls";
import EpisodeList from "./episodeList";
import ActionButton from "@/components/contentActionButtons/actionButton";
import BottomControls from "./bottomControls";

import "./index.css";

const Navigation: React.FC = () => {
  return (
    <div>
      <TopControls />

      <EpisodeList />

      <ActionButton
        text="Show More"
        className="bg-[var(--app-badge)] hover:bg-[#2f5161] focus-visible:bg-[#2f5161]"
      />

      <BottomControls />
    </div>
  );
};

export default Navigation;
