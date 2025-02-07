"use client";

import { useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { cleanString } from "@/lib/utils";

import ContentActionButtons from "@/components/contentActionButtons";

import { BannerItem } from "./index.types";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "./index.css";

const Banner: React.FC<{ bannerItems: BannerItem[] }> = ({ bannerItems }) => {
  const [currentActiveCard, setCurrentActiveCard] = useState(0);

  function changeCurrentActiveCard(e: MouseEvent) {
    const { target } = e;

    const element = (target as HTMLElement).closest("button");
    const dataIndex = parseInt(element?.getAttribute("data-index")!);

    setCurrentActiveCard(dataIndex);
  }

  function nextSlide() {
    setCurrentActiveCard((prev) => (prev + 1) % bannerItems.length);
  }

  return (
    <div className="relative z-0">
      <div className="container-cmp carousel-navigation-arrow has-no-gutters left-0">
        <button
          aria-label="Prev slide"
          data-index={
            (currentActiveCard - 1 + bannerItems.length) % bannerItems.length
          }
          onClick={changeCurrentActiveCard}
        >
          <FaChevronLeft />
        </button>
      </div>

      <div className="carousel-cards">
        {bannerItems.map((bannerItem, index) => {
          const ariaCurrent = currentActiveCard === index;
          const tabIndex = currentActiveCard === index ? 0 : -1;

          const seriesLink = `/series/${bannerItem.id}/${cleanString(bannerItem.title)}`;
          const episodeLink = `/watch/${bannerItem.episodeId}/${cleanString(bannerItem.episodeTitle)}`;

          return (
            <div
              key={bannerItem.id}
              aria-current={ariaCurrent}
              role="group"
              aria-roledescription="Slide"
              aria-label={`${index + 1} of ${bannerItems.length}`}
              className="carousel-card"
            >
              <div className="container-cmp carousel-card-container has-no-gutters">
                <div className="carousel-card-grid">
                  <div className="carousel-card-bg">
                    <Image
                      fill
                      priority
                      sizes="(max-width: 420px) 420px, 820px"
                      src={bannerItem.banner.tall}
                      alt={bannerItem.title}
                      className="block size-full object-cover object-[center_top] md:hidden"
                    />

                    <Image
                      fill
                      priority
                      sizes="(max-width: 960px) 960px, (max-width: 1350px) 1350px, (max-width: 1920) 1920px, (max-width: 3840) 3840px, 100vw"
                      src={bannerItem.banner.wide}
                      alt={bannerItem.title}
                      className="hidden size-full object-cover object-right-top md:block"
                    />
                  </div>

                  <div className="carousel-card-title">
                    <Link
                      tabIndex={tabIndex}
                      href={seriesLink}
                      prefetch={false}
                      className="carousel-card-logo"
                    >
                      <figure className="relative size-full">
                        <Image
                          fill
                          priority
                          sizes="(max-width: 960px) 320px, (max-width: 1260px) 480px, 600px"
                          src={bannerItem.banner.name}
                          alt={bannerItem.title}
                        />

                        <figcaption className="carousel-card-seo-title">
                          {bannerItem.title}
                        </figcaption>
                      </figure>
                    </Link>
                  </div>

                  <div className="carousel-card-body">
                    <div className="meta-tags mt-3.5 mb-5 text-[var(--meta-color)] sm:mb-8 md:mt-[22px] lg:mb-2 2xl:mt-[34px]">
                      {bannerItem.metaTags.map((metaTag, index) => (
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

                      {bannerItem.genres.map((genre, index) => (
                        <span
                          key={index}
                          className="rhombus before:bg-[var(--meta-color)]"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>

                    <p className="carousel-card-description">
                      {bannerItem.description}
                    </p>

                    <ContentActionButtons
                      tabIndex={tabIndex}
                      watchActionhref={episodeLink}
                      watchActionText={`Start Watching ${bannerItem.totalSeasons > 1 ? "S1 E1" : "E1"}`}
                    />
                  </div>
                </div>

                <div className="carousel-card-sizer" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-cmp carousel-navigation-arrow has-no-gutters right-0">
        <button
          aria-label="Next slide"
          data-index={(currentActiveCard + 1) % bannerItems.length}
          onClick={changeCurrentActiveCard}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="container-cmp relative flex w-full justify-center pt-6 sm:pt-[39px] md:justify-start md:pt-7 lg:pt-[48px] 2xl:pt-[64px]">
        {bannerItems.map((bannerItem, index) => (
          <button
            key={bannerItem.id}
            aria-current={currentActiveCard === index}
            aria-label={`Show slide ${index + 1} of ${bannerItems.length}`}
            data-index={index}
            onClick={changeCurrentActiveCard}
            className="navigatin-button"
          >
            <div className="app-transition-colors flex size-full overflow-hidden rounded-sm bg-[var(--pill-color)] duration-500">
              <span onAnimationEnd={nextSlide} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
