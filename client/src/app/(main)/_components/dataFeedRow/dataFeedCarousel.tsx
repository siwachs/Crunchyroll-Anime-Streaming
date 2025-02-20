"use client";

import { MouseEvent, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { cleanString, getCompactNotation } from "@/lib/utils";

import {
  HiOutlinePlay,
  HiStar,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import { AddToWatchListOutlined } from "@/assets/addToWatchListIcons";

import { DataFeedItem } from "./index.types";

const DataFeedCarousel: React.FC<{ dataFeed: DataFeedItem[] }> = ({
  dataFeed,
}) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  function scroll(e: MouseEvent) {
    const { target } = e;

    const element = (target as HTMLElement).closest("button");
    const dataScroll = element?.getAttribute("data-scroll");

    const layout = layoutRef.current!;
    const track = trackRef.current!;
    const card = cardRef.current!;

    const scrollStep = parseInt(
      getComputedStyle(layout).getPropertyValue("--scroll-step"),
    );
    const cardWidth = card.clientWidth;

    track.scrollBy({
      left:
        dataScroll === "previous"
          ? -cardWidth * scrollStep
          : cardWidth * scrollStep,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    const track = trackRef.current!;
    const cards = track.querySelectorAll(".carousel-scroller-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          (target as HTMLElement).inert = !isIntersecting;
        });
      },
      { root: track, threshold: 0.5 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={layoutRef}
      className="container-cmp wide-cards-carousel-layout has-no-gutters"
    >
      <div className="container-cmp wide-cards-carousel-container">
        <div className="wide-card-carousel-arrow-wrapper">
          <button
            className="wide-card-carousel-arrow arrow-dir-to-left"
            aria-label="Previous"
            data-scroll="previous"
            onClick={scroll}
          >
            <HiMiniChevronLeft />
          </button>
        </div>

        <div className="wide-cards-carousel-frame">
          <div className="carousel-scroller">
            <div className="carousel-scroller-wrapper">
              <div ref={trackRef} className="carousel-scroller-track">
                {dataFeed.map((dataFeedItem) => {
                  const seriesLink = `/series/${dataFeedItem.id}/${cleanString(dataFeedItem.title)}`;
                  const compactAverageRating = getCompactNotation(
                    dataFeedItem.averageRating,
                  );
                  const episodeLink = `/watch/${dataFeedItem.episodeId}/${cleanString(dataFeedItem.episodeTitle)}`;

                  return (
                    <div
                      key={dataFeedItem.id}
                      ref={cardRef}
                      className="carousel-scroller-card"
                    >
                      <div className="browse-card">
                        <Link
                          href={seriesLink}
                          prefetch={false}
                          tabIndex={-1}
                          className="relative block"
                        >
                          <div className="browse-card-poster">
                            <Image
                              fill
                              sizes="(min-width: 2160px) calc(100vw / 7), (min-width: 1720px) calc(100vw / 6), (min-width: 800px) calc(100vw / 5), (min-width: 568px) calc(100vw / 4), (min-width: 480px) calc(100vw / 3), 50vw"
                              src={dataFeedItem.poster.raw}
                              alt={dataFeedItem.title}
                              className="block size-full object-cover object-top"
                            />
                          </div>
                        </Link>

                        <div className="browse-card-body">
                          <h4 className="browse-card-body-title">
                            <Link
                              href={seriesLink}
                              prefetch={false}
                              tabIndex={-1}
                            >
                              {dataFeedItem.title}
                            </Link>
                          </h4>

                          <div className="meta-tags mt-2 inline-flex text-[var(--meta-color)]">
                            {dataFeedItem.metaTags.map((metaTag, index) => (
                              <span
                                key={index}
                                className={
                                  index === 0
                                    ? ""
                                    : "rhombus before:bg-[var(--meta-color)]"
                                }
                              >
                                {metaTag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="browse-card-hover">
                          <div className="browse-card-hover-content">
                            <Link
                              href={seriesLink}
                              prefetch={false}
                              tabIndex={-1}
                              className="browse-card-hover-poster-wrapper"
                            >
                              <div className="relative size-full">
                                <Image
                                  fill
                                  sizes="(min-width: 2160px) calc(100vw / 7), (min-width: 1720px) calc(100vw / 6), (min-width: 800px) calc(100vw / 5), (min-width: 568px) calc(100vw / 4), (min-width: 480px) calc(100vw / 3), 50vw"
                                  src={dataFeedItem.poster.raw}
                                  alt={dataFeedItem.title}
                                  className="block size-full object-cover object-top"
                                />
                              </div>
                            </Link>

                            <Link
                              href={seriesLink}
                              prefetch={false}
                              className="browse-card-hover-link"
                            />

                            <div className="browse-card-hover-body">
                              <h4 className="browse-card-body-title mb-3">
                                <Link
                                  href={seriesLink}
                                  prefetch={false}
                                  tabIndex={-1}
                                >
                                  {dataFeedItem.title}
                                </Link>
                              </h4>

                              <div className="mb-1 flex items-center gap-1 text-[var(--app-icon-primary)]">
                                <p className="text-sm/4.5 font-medium">
                                  {dataFeedItem.averageRating}
                                </p>
                                <HiStar className="size-4" />
                                <p className="text-sm/4.5 font-medium uppercase">
                                  ({compactAverageRating})
                                </p>
                              </div>

                              <div className="mb-2 flex flex-col text-[var(--meta-color)]">
                                <span className="text-sm/4.5 font-semibold">
                                  {dataFeedItem.totalSeasons} Seasons
                                </span>
                                <span className="text-sm/4.5 font-semibold">
                                  {dataFeedItem.totalEpisodes} Episodes
                                </span>
                              </div>

                              <h4 className="browse-card-hover-body-description">
                                {dataFeedItem.description}
                              </h4>
                            </div>

                            <div className="browse-card-hover-footer">
                              <Link
                                href={episodeLink}
                                prefetch={false}
                                className="outline-xs browse-card-hover-footer-button"
                              >
                                <HiOutlinePlay
                                  strokeWidth={2.08}
                                  className="size-7"
                                />
                              </Link>

                              <button className="outline-xs browse-card-hover-footer-button">
                                <AddToWatchListOutlined className="size-6 fill-current" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="wide-card-carousel-arrow-wrapper">
          <button
            className="wide-card-carousel-arrow arrow-dir-to-right"
            aria-label="Next"
            data-scroll="next"
            onClick={scroll}
          >
            <HiMiniChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataFeedCarousel;
