import Link from "next/link";
import Image from "next/image";

import Dropdown from "@/components/dropdown";

import { HiOutlineCalendar } from "react-icons/hi";
import { HiOutlinePlay } from "react-icons/hi2";
import { MdMoreVert } from "react-icons/md";

import episodeList from "@/data/episideList";

const EpisodeList: React.FC = () => {
  return (
    <div className="episode-list">
      {episodeList.map((episode) => (
        <div key={episode.id} className="playable-card">
          <Link
            href="/#"
            prefetch={false}
            tabIndex={-1}
            className="playable-card-thumbnail-wrapper"
          >
            <figure className="playable-card-thumbnail">
              <Image
                src={episode.thumbnail}
                alt={episode.title}
                className="block size-full object-cover"
              />
            </figure>

            <div className="playable-card-duration">{episode.duration}</div>
          </Link>

          <div className="playable-card-hover-info app-transition-opacity">
            <div className="playable-card-hover-preview">
              <Link
                href={`#${episode.title}`}
                prefetch={false}
                title={episode.title}
                className="absolute inset-0 z-[1]"
              />

              <div className="playable-card-thumbnail-wrapper playable-card-hover-thumbnail-wrapper">
                <figure className="playable-card-thumbnail">
                  <Image
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="block size-full object-cover"
                  />
                </figure>

                <div className="playable-card-duration">{episode.duration}</div>
              </div>

              <div className="playable-card-hover-body">
                <Link
                  href={`#Dragon Ball DAIMA`}
                  prefetch={false}
                  className="playable-card-small-title z-[1]"
                >
                  <small className="transition-[color] duration-200 ease-quick hover:text-white hover:underline">
                    Dragon Ball DAIMA
                  </small>
                </Link>

                <h4 className="playable-card-title playable-card-hover-title">
                  <Link
                    href={`/#${episode.title}`}
                    prefetch={false}
                    tabIndex={-1}
                  >
                    {episode.title}
                  </Link>
                </h4>

                <p className="playable-card-hover-release">
                  <HiOutlineCalendar className="mr-1 size-4" />
                  <span>10/11/2024</span>
                </p>

                <div className="playable-card-hover-description-wrapper">
                  <p>
                    A giant castle in a mysterious world. Two shady Majin, Gomah
                    and Degesu, watch a monitor. The monitor shows Goku and the
                    others having a fierce battle against Majin Buu. Gomah and
                    Degesu head to Earth to execute a certain conspiracy.
                  </p>
                </div>

                <div className="playable-card-footer">
                  <div className="playable-card-hover-play">
                    <HiOutlinePlay
                      strokeWidth={2.08}
                      className="block size-6 flex-[0_0_auto]"
                    />
                    <span>Play E1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="playable-card-body-aligner">
            <div className="playable-card-body">
              <div className="playable-card-small-title">
                <small>Dragon Ball DAIMA</small>
              </div>

              <h4 className="playable-card-title">
                <Link
                  href={`/#${episode.title}`}
                  prefetch={false}
                  tabIndex={-1}
                >
                  {episode.title}
                </Link>
              </h4>

              <div className="playable-card-footer">
                <div className="meta-tags">
                  <span>{episode.metaTags}</span>
                </div>

                <Dropdown
                  dropdownTriggerClassName="z-[1] hover:text-white"
                  Icon={<MdMoreVert className="size-6" />}
                  dropdownTriggerNoHoverBg
                  dropdownContentTitle="Options"
                  dropdownContentScrollableList={[
                    <button key={0}>Mark as Watched</button>,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
