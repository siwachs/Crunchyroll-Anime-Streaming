import Image from "next/image";
import Link from "next/link";

import { cleanString } from "@/lib/utils";

import Ratings from "@/components/ratings";
import ContentActionButtons from "@/components/contentActionButtons";
import Dropdown from "@/components/dropdown";
import MarkSeriesAsWatched from "@/components/dropdown/menuItems/markSeriesAsWatched";

import { MdMoreVert } from "react-icons/md";
import { HiOutlineShare, HiOutlinePlus } from "react-icons/hi";

import "./index.css";

const Banner: React.FC<{
  seriesId: string;
  poster: { tall: string; wide: string };
  title: string;
  metaTags: string[];
  genres: string[];
  averageRating: number;
  totalRating: number;
  totalSeasons: number;
  episodeId: string;
  episodeTitle: string;
}> = ({
  seriesId,
  poster,
  title,
  metaTags,
  genres,
  averageRating,
  totalRating,
  totalSeasons,
  episodeId,
  episodeTitle,
}) => {
  const watchActionText = `Start Watching ${totalSeasons > 1 ? "S1 E1" : "E1"}`;
  const watchActionhref = `/watch/${episodeId}/${cleanString(episodeTitle)}`;

  return (
    <div className="relative">
      <div className="container-cmp has-no-gutters series-banner-container">
        <div className="series-banner-container-grid">
          <div className="series-banner-background">
            <picture className="relative block size-full">
              <Image
                fill
                src={poster.tall}
                alt={title}
                className="object-cover object-[center_top] md:hidden"
              />
              <Image
                fill
                src={poster.wide}
                alt={title}
                className="hidden object-cover object-[left_top] md:block"
              />
            </picture>
          </div>

          <div className="series-banner-body">
            <h1 className="text-rendering-optimized md:text-3.5xl/leading-10.5 sm:text-2.5xl/9 text-2xl font-medium">
              {title}
            </h1>

            <div className="grid grid-flow-row grid-cols-[minmax(0,auto)] gap-2">
              <div className="flex justify-center md:justify-start">
                <div className="meta-tags meta-tags-are-light">
                  {metaTags.map((metaTag, index) => (
                    <span
                      key={index}
                      className={`${index !== 0 ? "rhombus" : ""}`}
                    >
                      {metaTag}
                    </span>
                  ))}

                  {genres.map((genre, index) => (
                    <span key={index}>
                      <Link
                        key={index}
                        href={`/genres/${genre.toLowerCase()}`}
                        prefetch={false}
                        className={`app-transition-colors outline-xs underline ${index === 0 ? "rhombus" : ""} hover:text-white focus-visible:text-white`}
                      >
                        {genre}
                      </Link>

                      {index !== genres.length - 1 && (
                        <span className="mr-1">,</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center sm:justify-start">
                <Ratings
                  averageRating={averageRating}
                  totalRating={totalRating}
                />
              </div>
            </div>

            <div className="pt-1 sm:pt-1.5">
              <div className="flex flex-col flex-wrap items-center gap-[0.3125rem] md:flex-row md:gap-2.5">
                <ContentActionButtons
                  className="w-full p-[0.3125rem] sm:px-0 md:w-auto"
                  watchActionText={watchActionText}
                  watchActionhref={watchActionhref}
                />

                <div className="flex flex-nowrap items-center justify-center gap-2.5 md:justify-start">
                  <button title="My List" className="series-action-button">
                    <HiOutlinePlus className="m-2 size-6" />
                    <span className="text-[0.625rem] font-black uppercase md:hidden">
                      My List
                    </span>
                  </button>

                  <button title="Share" className="series-action-button">
                    <HiOutlineShare className="m-2 size-6" />
                    <span className="text-[0.625rem] font-black uppercase md:hidden">
                      Share
                    </span>
                  </button>

                  <Dropdown
                    align="right"
                    className="hidden md:block"
                    triggerTitle="More Options"
                    triggerClassName="text-[var(--app-background-crunchyroll-orange)] hover:text-[var(--app-hover-crunchyroll-orange)] focus-visible:text-[var(--app-hover-crunchyroll-orange)] m-2"
                    Icon={<MdMoreVert className="size-6" />}
                    menuClassName="translate-x-[40px]"
                    headerTitle="More"
                  >
                    <MarkSeriesAsWatched seriesId={seriesId} />
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="series-banner-container-sizer" />
      </div>

      <Dropdown
        position="top"
        align="right"
        className="md:hidden"
        triggerTitle="More Actions"
        triggerClassName="hover:bg-[var(--app-background-secondary)] focus-visible:bg-[var(--app-background-secondary)] p-2"
        triggerActiveClassName="bg-[var(--app-background-secondary)]"
        Icon={<MdMoreVert className="size-6" />}
        headerTitle="More"
      >
        <MarkSeriesAsWatched seriesId={seriesId} />
      </Dropdown>
    </div>
  );
};

export default Banner;
