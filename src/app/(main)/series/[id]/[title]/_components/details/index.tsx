"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Dropdown from "@/components/dropdown";
import Ratings from "./_components/ratings";
import ContentActionButtons from "@/components/contentActionButtons";
import Description from "@/components/description";
import WatchAction from "@/components/contentActionButtons/watchAction";

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
          <h1 className="text-rendering-optimized">Dragon Ball DAIMA</h1>

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
          watchActionText="Start Watching E1"
          className="mb-7.5 sm:justify-start"
          enableDetailsPageStyles
        />

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

      <div className="up-next-section">
        <Link
          href={`/watch/${478273928}/${encodeURIComponent("Dragon Ball DAIMA".toLowerCase().replaceAll(" ", "-"))}`}
          prefetch={false}
          className="relative block"
        >
          <figure className="playable-card-thumbnail playable-card-thumbnail-has-width mb-3">
            <Image
              sizes="360px"
              src={upNextThumbanil}
              alt="Dragon Ball DAIMA"
              className="block size-full object-cover"
            />
          </figure>

          <div className="playable-card-duration">32m</div>
        </Link>

        <WatchAction
          watchActionhref="#watchEpisode"
          watchActionText="Start Watching E1"
          className="md:w-full"
        />
      </div>

      <div
        data-active={isStickyButtonsVisible}
        className="sticky-buttons-wrapper"
      >
        <ContentActionButtons
          watchActionhref={`/watch/${478273928}/${encodeURIComponent("Dragon Ball DAIMA".toLowerCase().replaceAll(" ", "-"))}`}
          watchActionText="Start Watching E1"
          enableDetailsPageStyles
        />
      </div>
    </div>
  );
};

export default Details;
