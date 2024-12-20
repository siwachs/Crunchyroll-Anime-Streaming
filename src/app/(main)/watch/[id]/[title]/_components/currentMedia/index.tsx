import Link from "next/link";

import AverageRating from "@/components/ratings/averageRating";
import Description from "@/components/description";

import { HiOutlineBookmark } from "react-icons/hi";
import {
  ThumbUpOutlined,
  ThumbUpFilled,
  ThumbDownOutlined,
  ThumbDownFilled,
} from "@/assets/watch/thumbIcons";

import "./index.css";

const CurrentMedia = () => {
  const encodedSeriesTitle = encodeURIComponent(
    "Solo Leveling".toLowerCase().replaceAll(" ", "-"),
  );

  return (
    <div className="current-media">
      <div className="current-media-info">
        <div className="current-media-header">
          <div className="current-media-parent-ref">
            <Link
              href={`/watch/3hs728/${encodedSeriesTitle}`}
              prefetch={false}
              className="app-transition-colors show-title-link"
            >
              <h4 className="text-base font-semibold">Solo Leveling</h4>
            </Link>

            <AverageRating mode="compact" />
          </div>

          <button>
            <HiOutlineBookmark className="app-transition-colors size-10 p-2 hover:fill-white" />
          </button>
        </div>

        <h1 className="heading text-rendering-optimized">
          E2 - If I Had One More Chance
        </h1>

        <div className="meta-tags mb-2">
          <span>Sub | Dub</span>
        </div>

        <p className="mb-3 text-sm/leading-4.5 font-medium sm:mb-2">
          Released on Jan 13, 2024
        </p>

        <div className="episode-actions">
          <div className="episode-ratings">
            <button className="episode-rate-action app-transition-colors">
              <ThumbUpOutlined />
              <ThumbUpFilled />
              <span>128.3K</span>
            </button>

            <button className="episode-rate-action app-transition-colors">
              <ThumbDownOutlined />
              <ThumbDownFilled />
              <span>400</span>
            </button>
          </div>

          {/* Share Button Goes here */}
        </div>

        <Description
          description="Jinwoo and his party appear to have cleared a low-level dungeon, when a hidden path to an unfamiliar temple is revealed. There they encounter a set of commandments and a group of monsters that cause them absolute despair."
          expandableTableRows={{
            Audio:
              "Japanese, English, Deutsch, Español (América Latina), Español (España), Français, Italiano, Português (Brasil), हिंदी, தமிழ், తెలుగు, 한국어",
            Subtitles:
              "English, Bahasa Indonesia, Bahasa Melayu, Deutsch, Español (América Latina), Español (España), Français, Italiano, Português (Brasil), Tiếng Việt, Русский, العربية, ไทย",
          }}
        />
      </div>
    </div>
  );
};

export default CurrentMedia;
