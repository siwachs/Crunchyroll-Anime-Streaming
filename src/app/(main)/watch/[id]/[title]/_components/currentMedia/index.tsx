import Description from "@/components/description";

import {
  ThumbUpOutlined,
  ThumbUpFilled,
  ThumbDownOutlined,
  ThumbDownFilled,
} from "@/assets/watch/thumbIcons";

import "./index.css";

const CurrentMedia = () => {
  return (
    <div className="current-media">
      <div className="current-media-info">
        <div className="current-media-header"></div>

        <h1 className="heading text-rendering-optimized">
          E2 - If I Had One More Chance
        </h1>

        <div className="meta-tags mb-2">
          <span>Sub | Dub</span>
        </div>

        <p className="app-text-is-m mb-3">Released on Jan 13, 2024</p>

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
