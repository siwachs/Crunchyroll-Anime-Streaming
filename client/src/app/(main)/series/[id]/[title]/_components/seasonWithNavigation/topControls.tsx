import { useSeasonEpisodes } from "@/providers/seasonEpisodesProvider";

import { getTitleWithSeasonNumber } from "@/lib/utils";

import Dropdown from "../dropdown";
import SeasonList from "@/app/(main)/series/[id]/[title]/_components/dropdown/menuItems/seasonList";
import SortList from "@/app/(main)/series/[id]/[title]/_components/dropdown/menuItems/sortList";
import MarkSeasonAsWatched from "@/app/(main)/series/[id]/[title]/_components/dropdown/menuItems/markSeasonAsWatched";

import { FaCaretDown } from "react-icons/fa";
import { Sort } from "@/assets/icons";
import { MdMoreVert } from "react-icons/md";

const TopControls: React.FC = () => {
  const {
    seasons,
    currentSeason: { season, title },
    seasonEpisodesPayload: { currentSortOrder },
  } = useSeasonEpisodes();

  const seasonTitle = getTitleWithSeasonNumber(season, title);

  return (
    <div className="top-controls flex items-center pb-3">
      <div className="flex min-w-[50%] flex-1 pr-6">
        {seasons.length <= 1 ? (
          <h4 className="truncate text-base font-semibold sm:text-lg/relaxed">
            {seasonTitle}
          </h4>
        ) : (
          <Dropdown
            align="left"
            className="w-auto max-w-full"
            triggerClassName="hover:text-[#2abdbb] focus-visible:text-[#2abdbb] py-2.5 pr-2 w-full"
            triggerActiveClassName="text-[#2abdbb]"
            Icon={<FaCaretDown className="size-4" />}
            triggerLabel={
              <h4 className="ml-[0.3125rem] truncate text-base font-semibold sm:ml-4 sm:text-lg/relaxed">
                {seasonTitle}
              </h4>
            }
            menuClassName="sm:min-w-xs sm:max-h-[16.25rem]"
            headerTitle="Seasons"
          >
            <SeasonList />
          </Dropdown>
        )}
      </div>

      <Dropdown
        align="right"
        triggerTitle="Sort"
        triggerClassName="text-[var(--meta-color)] hover:text-white hover:bg-[var(--app-background-secondary)] focus-visible:bg-[var(--app-background-secondary)] focus-visible:text-white p-2.5"
        triggerActiveClassName="text-white bg-[var(--app-background-secondary)]"
        Icon={<Sort className="size-6 fill-current" />}
        triggerLabel={
          <span className="sm:initial ml-2 hidden text-sm/4.5 font-black uppercase">
            {currentSortOrder}
          </span>
        }
        headerTitle="Sort"
      >
        <SortList />
      </Dropdown>

      <Dropdown
        align="right"
        triggerTitle="More Actions"
        triggerClassName="text-[var(--meta-color)] hover:text-white hover:bg-[var(--app-background-secondary)] focus-visible:bg-[var(--app-background-secondary)] focus-visible:text-white p-2.5"
        triggerActiveClassName="text-white bg-[var(--app-background-secondary)]"
        Icon={<MdMoreVert className="size-6 fill-current" />}
        triggerLabel={
          <span className="sm:initial ml-2 hidden text-sm/4.5 font-black uppercase">
            Options
          </span>
        }
        headerTitle="Options"
      >
        <MarkSeasonAsWatched />
      </Dropdown>
    </div>
  );
};

export default TopControls;
