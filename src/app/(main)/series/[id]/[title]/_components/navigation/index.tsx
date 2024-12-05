import TopControls from "./topControls";
import EpisodeList from "./episodeList";

import "./index.css";

const Navigation: React.FC = () => {
  return (
    <div>
      <TopControls />

      <EpisodeList />
    </div>
  );
};

export default Navigation;
