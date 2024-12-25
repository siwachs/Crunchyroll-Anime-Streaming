"use client";

import { useState, useRef, useEffect } from "react";

import Dropdown from "@/components/dropdown";
import Ratings from "@/components/ratings";
import ContentActionButtons from "@/components/contentActionButtons";
import Description from "@/components/description";
import UpNextSectionPlayable from "@/components/playableCard/upNextSectionPlayable";

import { MdMoreVert } from "react-icons/md";

import upNextThumbanil from "@/assets/episodeList/1.jpg";
import "./index.css";

const Details: React.FC = () => {
  const contentActionButtonsRef = useRef<HTMLDivElement>(null);
  const [isStickyButtonsVisible, setIsStickyButtonsVisible] = useState(false);

  useEffect(() => {
    const contentActionButtons = contentActionButtonsRef.current!;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStickyButtonsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-60px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(contentActionButtons);

    return () => observer.unobserve(contentActionButtons);
  }, []);

  return (
    <div className="details-wrapper">
      <div className="body">
        <div className="heading-line">
          <h1 className="heading">Dragon Ball DAIMA</h1>

          <Dropdown
            title="More actions"
            dropdownTriggerClassName="p-2 md:mt-0.5"
            Icon={<MdMoreVert className="size-6" />}
            dropdownContentTitle="Options"
            dropdownContentScrollableList={[
              <button key={0}>Mark Series as Watched</button>,
              <button key={1}>Share</button>,
            ]}
          />
        </div>

        <div className="meta-tags mb-3 sm:mb-5">
          <span>12</span>
          <span className="rhombus">Sub | Dub</span>
        </div>

        <Ratings />

        <ContentActionButtons
          ref={contentActionButtonsRef}
          watchActionhref={`/watch/${478273928}/${encodeURIComponent("Dragon Ball DAIMA".toLowerCase().replaceAll(" ", "-"))}`}
          watchActionText="Start Watching S1 E1"
          className="mb-7.5 sm:justify-start"
          buttonType="two"
        />

        <Description
          description="Jinwoo and his party appear to have cleared a low-level dungeon, when a hidden path to an unfamiliar temple is revealed. There they encounter a set of commandments and a group of monsters that cause them absolute despair."
          genres={["Action", "Comedy", "Fantasy", "Shonen", "Horror", "Sci-Fi"]}
          expandableTableRows={{
            Audio:
              "Japanese, English, Deutsch, Español (América Latina), Español (España), Français, Italiano, Português (Brasil), हिंदी, தமிழ், తెలుగు, 한국어",
            Subtitles:
              "English, Bahasa Indonesia, Bahasa Melayu, Deutsch, Español (América Latina), Español (España), Français, Italiano, Português (Brasil), Tiếng Việt, Русский, العربية, ไทย",
          }}
        />
      </div>

      <UpNextSectionPlayable
        seriesId="482782"
        seriesTitle="Dragon Ball DAIMA"
        upNextThumbnail={upNextThumbanil}
        duration="32m"
        watchActionText="Start Watching E1"
      />

      <div
        data-active={isStickyButtonsVisible}
        className="sticky-buttons-wrapper"
      >
        <ContentActionButtons
          watchActionhref={`/watch/${478273928}/${encodeURIComponent("Dragon Ball DAIMA".toLowerCase().replaceAll(" ", "-"))}`}
          watchActionText="Start Watching S1 E1"
          buttonType="two"
        />
      </div>
    </div>
  );
};

export default Details;
