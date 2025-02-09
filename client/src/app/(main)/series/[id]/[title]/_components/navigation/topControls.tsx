import Dropdown from "@/app/(main)/series/[id]/[title]/_components/dropdown/menu";

import { FaCaretDown } from "react-icons/fa";
import { MdMoreVert, MdSort } from "react-icons/md";

const TopControls: React.FC = () => {
  return (
    <div className="top-controls">
      <div className="seasons-select">
        <Dropdown
          position="left"
          title="Seasons Select"
          className="text-white"
          Icon={<FaCaretDown className="size-4" />}
          triggerHeader="Dragon Ball DAIMA"
          dropdownTitle="Seasons"
          dropdownItems={[
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
          dropdownTriggerType="two"
        />
      </div>

      <Dropdown
        title="Sort"
        className="p-2.5"
        Icon={<MdSort className="size-6" />}
        triggerTitle="Oldest"
        dropdownTitle="Sort"
        dropdownItems={[
          <button key={0} data-active="true">
            Oldest
          </button>,
          <button key={1} data-active="false">
            Newest
          </button>,
        ]}
        dropdownTriggerType="one"
      />

      <Dropdown
        title="More actions"
        className="p-2.5"
        Icon={<MdMoreVert className="size-6" />}
        dropdownTitle="Options"
        dropdownItems={[<button key={0}>Mark Season as Watched</button>]}
        dropdownTriggerType="one"
      />
    </div>
  );
};

export default TopControls;
