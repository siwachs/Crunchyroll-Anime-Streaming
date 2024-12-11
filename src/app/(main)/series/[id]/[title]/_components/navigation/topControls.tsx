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
