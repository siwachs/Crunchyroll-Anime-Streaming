"use client";

import { MouseEvent, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  HiOutlinePlay,
  HiStar,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";

import images from "@/assets/dataFeed";

const DataFeedCarousel = () => {
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
      className="container-cmp wide-cards-carousel-layout px-0"
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
                {images.map((image) => (
                  <div
                    key={image.key}
                    ref={cardRef}
                    className="carousel-scroller-card"
                  >
                    <div className="browse-card">
                      <Link
                        href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                        prefetch={false}
                        tabIndex={-1}
                        className="relative block"
                      >
                        <div className="browse-card-poster">
                          <Image
                            sizes="(min-width: 2160px) calc(100vw / 7), (min-width: 1720px) calc(100vw / 6), (min-width: 800px) calc(100vw / 5), (min-width: 568px) calc(100vw / 4), (min-width: 480px) calc(100vw / 3), 50vw"
                            src={image.image}
                            alt={image.title}
                            className="block size-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="browse-card-body">
                        <h4 className="browse-card-body-title">
                          <Link
                            href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                            prefetch={false}
                            tabIndex={-1}
                          >
                            {image.title}
                          </Link>
                        </h4>

                        <div className="browse-card-body-metatags">
                          <span>Subtitled</span>
                        </div>
                      </div>

                      <div className="browse-card-hover">
                        <div className="browse-card-hover-content">
                          <Link
                            href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                            prefetch={false}
                            tabIndex={-1}
                            className="browse-card-hover-poster-wrapper"
                          >
                            <div className="relative size-full">
                              <Image
                                sizes="(min-width: 2160px) calc(100vw / 7), (min-width: 1720px) calc(100vw / 6), (min-width: 800px) calc(100vw / 5), (min-width: 568px) calc(100vw / 4), (min-width: 480px) calc(100vw / 3), 50vw"
                                src={image.image}
                                alt={image.title}
                                className="block size-full object-cover"
                              />
                            </div>
                          </Link>

                          <Link
                            href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                            prefetch={false}
                            className="browse-card-hover-link"
                          />

                          <div className="browse-card-hover-body">
                            <h4 className="browse-card-body-title mb-3">
                              <Link
                                href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                                prefetch={false}
                                tabIndex={-1}
                              >
                                {image.title}
                              </Link>
                            </h4>

                            <div className="mb-1 flex items-center gap-1 text-[var(--app-icon-primary)]">
                              <p className="app-text">4.7</p>
                              <HiStar className="size-4" />
                              <p className="app-text uppercase">(43k)</p>
                            </div>

                            <div className="mb-2 flex flex-col text-[var(--meta-color)]">
                              <span className="app-text font-semibold">
                                3 Seasons
                              </span>
                              <span className="app-text font-semibold">
                                329 Episodes
                              </span>
                            </div>

                            <h4 className="browse-card-hover-body-description">
                              {image.description}
                            </h4>
                          </div>

                          <div className="browse-card-hover-footer">
                            <button className="browse-card-hover-footer-button">
                              <HiOutlinePlay
                                strokeWidth={2.08}
                                className="size-7"
                              />
                            </button>

                            <button className="browse-card-hover-footer-button">
                              <HiOutlineBookmark
                                strokeWidth={2.08}
                                className="size-[22px]"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
