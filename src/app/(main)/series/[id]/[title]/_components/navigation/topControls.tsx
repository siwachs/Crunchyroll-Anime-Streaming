import Dropdown from "@/components/dropdown";

import { FaCaretDown } from "react-icons/fa";
import { MdMoreVert, MdSort } from "react-icons/md";

const TopControls: React.FC = () => {
  return (
    <div className="top-controls">
      <div className="seasons-select">
        <Dropdown
          title="Seasons Select"
          dropdownTriggerClassName="text-white"
          Icon={<FaCaretDown className="size-4" />}
          dropdownTriggerHeader="Dragon Ball DAIMA"
          dropdownTriggerTransparentHoverBg
          dropdownContentTitle="Seasons"
          dropdownContentScrollableList={[
            <button data-active={true} key={0}>
              <span>S1: Dragon Ball DAIMA</span>
              <span>175 Episodes</span>
            </button>,
            <button key={1}>
              <span>S2: Dragon Ball DAIMA</span>
              <span>230 Episodes</span>
            </button>,
            <button key={2}>
              <span>S3: Dragon Ball DAIMA</span>
              <span>290 Episodes</span>
            </button>,
          ]}
        />
      </div>

      <Dropdown
        title="Sort"
        dropdownTriggerClassName="p-2.5"
        Icon={<MdSort className="size-6" />}
        dropdownTriggerTitle="Oldest"
        dropdownContentTitle="Sort"
        dropdownContentScrollableList={[
          <button key={0}>Oldest</button>,
          <button key={1}>Newest</button>,
        ]}
      />

      <Dropdown
        title="More actions"
        dropdownTriggerClassName="p-2.5"
        Icon={<MdMoreVert className="size-6" />}
        dropdownContentTitle="Options"
        dropdownContentScrollableList={[
          <button key={0}>Mark Season as Watched</button>,
        ]}
      />
    </div>
  );
};

export default TopControls;
