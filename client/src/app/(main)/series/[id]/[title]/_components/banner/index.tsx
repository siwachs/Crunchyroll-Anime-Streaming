import Image from "next/image";
import Link from "next/link";

import Ratings from "@/components/ratings";
import ContentActionButtons from "@/components/contentActionButtons";
import Dropdown from "@/components/dropdown";

import { HiOutlineShare } from "react-icons/hi";

import "./index.css";

const Banner: React.FC<{
  seriesId: string;
  poster: { tall: string; wide: string };
  title: string;
  metaTags: string[];
  genres: string[];
  averageRating: number;
  totalRating: number;
}> = ({
  seriesId,
  poster,
  title,
  metaTags,
  genres,
  averageRating,
  totalRating,
}) => {
  return (
    <div className="relative">
      <div className="container-cmp has-no-gutters series-banner-container">
        <div className="series-banner-container-grid">
          <div className="series-banner-background">
            <div className="relative size-full">
              <Image
                fill
                src={poster.tall}
                alt={title}
                className="object-cover object-[center_top]"
              />
            </div>
          </div>

          <div className="series-banner-body">
            <h2 className="text-rendering-optimized text-2xl font-medium">
              {title}
            </h2>

            <div className="grid grid-flow-row grid-cols-[minmax(0,auto)] gap-2">
              <div className="flex justify-center">
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

              <div className="flex justify-center">
                <Ratings
                  averageRating={averageRating}
                  totalRating={totalRating}
                />
              </div>
            </div>

            <div className="pt-1">
              <div className="flex flex-col flex-wrap items-center gap-2.5">
                <ContentActionButtons
                  className="w-full p-[0.3125rem]"
                  watchActionText="Start Watching E1"
                  watchActionhref="#"
                />
              </div>

              <div className="flex flex-nowrap items-center justify-center gap-2.5 pt-[0.3125rem]">
                <button className="app-transition-colors inline-flex h-fit min-w-18 cursor-pointer flex-col items-center justify-center text-[var(--app-background-crunchyroll-orange)] uppercase select-none hover:text-[var(--app-hover-crunchyroll-orange)] focus-visible:text-[var(--app-hover-crunchyroll-orange)]">
                  <HiOutlineShare className="m-2 size-6" />
                  <span className="text-[0.625rem] font-black">Share</span>
                </button>

                {/* More Options Hidden */}
              </div>
            </div>
          </div>
        </div>

        <div className="series-banner-container-sizer" />
      </div>

      <Dropdown
        position="top"
        headerTitle="More"
        triggerTitle="More Actions"
        seriesId={seriesId}
      />
    </div>
  );
};

export default Banner;
