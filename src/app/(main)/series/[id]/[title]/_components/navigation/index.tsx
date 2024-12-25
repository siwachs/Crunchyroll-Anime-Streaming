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

      <ActionButton actionButtonText="Show More" />

      <BottomControls />
    </div>
  );
};

export default Navigation;
