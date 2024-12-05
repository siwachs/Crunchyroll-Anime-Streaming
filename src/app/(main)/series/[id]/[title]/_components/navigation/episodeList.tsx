import Link from "next/link";
import Image from "next/image";

import episodeList from "@/data/episideList";

import { HiOutlinePlay } from "react-icons/hi2";
import { MdMoreVert } from "react-icons/md";

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

          <div className="playable-card-hover-info">
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

                <button
                  title="More actions"
                  className="series-page-icon series-page-icon-no-hover-bg z-[1] p-0"
                >
                  <MdMoreVert className="series-page-icon-size" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;
