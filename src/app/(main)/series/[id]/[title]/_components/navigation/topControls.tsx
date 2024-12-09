import Dropdown from "@/components/dropdown";

import { MdMoreVert, MdSort } from "react-icons/md";

const TopControls: React.FC = () => {
  return (
    <div className="top-controls">
      <div className="seasons-select">
        <h4>Dragon Ball DAIMA</h4>
      </div>

      <Dropdown
        title="Sort"
        dropdownTriggerClassName="p-2.5"
        Icon={<MdSort className="size-6" />}
        dropdownTriggerTitle="Oldest"
      />

      <button title="More actions" className="series-page-icon p-2.5">
        <MdMoreVert className="series-page-icon-size" />
      </button>
    </div>
  );
};

export default TopControls;
