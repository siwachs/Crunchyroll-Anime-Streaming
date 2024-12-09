import { MdMoreVert, MdSort } from "react-icons/md";

const TopControls: React.FC = () => {
  return (
    <div className="top-controls">
      <div className="seasons-select">
        <h4>Dragon Ball DAIMA</h4>
      </div>

      <div className="relative flex select-none">
        <button
          title="Sort"
          className="series-page-icon episode-sort-select-button p-2.5"
        >
          <MdSort className="series-page-icon-size" />
          <span className="ml-2 hidden text-sm/leading-4.5 font-black uppercase sm:inline">
            Oldest
          </span>
        </button>

        <div className="episode-sort-select-content hidden"></div>
      </div>

      <button title="More actions" className="series-page-icon p-2.5">
        <MdMoreVert className="series-page-icon-size" />
      </button>
    </div>
  );
};

export default TopControls;
