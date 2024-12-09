import { MdMoreVert, MdSort } from "react-icons/md";

const TopControls: React.FC = () => {
  return (
    <div className="top-controls">
      <div className="seasons-select">
        <h4>Dragon Ball DAIMA</h4>
      </div>

      <button title="Sort" className="series-page-icon p-2.5">
        <MdSort className="series-page-icon-size" />
      </button>

      <button title="More actions" className="series-page-icon p-2.5">
        <MdMoreVert className="series-page-icon-size" />
      </button>
    </div>
  );
};

export default TopControls;
