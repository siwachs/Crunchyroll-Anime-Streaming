"use client";

import { useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import ContentActionButtons from "@/components/contentActionButtons";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import images from "@/data/banner";
import "./index.css";

const Banner: React.FC = () => {
  const [currentActiveCard, setCurrentActiveCard] = useState(5);

  function changeCurrentActiveCard(e: MouseEvent) {
    const { target } = e;

    const element = (target as HTMLElement).closest("button");
    const dataIndex = parseInt(element?.getAttribute("data-index")!);

    setCurrentActiveCard(dataIndex);
  }

  function nextSlide() {
    setCurrentActiveCard((prev) => (prev + 1) % images.length);
  }

  return (
    <div className="relative z-0">
      <div className="container-cmp carousel-navigation-arrow left-0 px-0">
        <button
          aria-label="Prev slide"
          data-index={(currentActiveCard - 1 + images.length) % images.length}
          onClick={changeCurrentActiveCard}
        >
          <FaChevronLeft />
        </button>
      </div>

      <div className="carousel-cards">
        {images.map((image, index) => {
          const ariaCurrent = currentActiveCard === index;
          const tabIndex = currentActiveCard === index ? 0 : -1;

          return (
            <div
              key={image.key}
              aria-current={ariaCurrent}
              role="group"
              aria-roledescription="Slide"
              aria-label={`${index + 1} of ${images.length}`}
              className="carousel-card"
            >
              <div className="container-cmp carousel-card-container px-0">
                <div className="carousel-card-grid">
                  <div className="carousel-card-bg">
                    <Image
                      fill
                      priority
                      sizes="(max-width: 420px) 420px, 820px"
                      src={image.mobileImage}
                      alt="The Do-Over Damsel Conquers the Dragon Emperor"
                      className="block size-full object-cover object-[center_top] md:hidden"
                    />

                    <Image
                      fill
                      priority
                      sizes="(max-width: 960px) 960px, (max-width: 1350px) 1350px, (max-width: 1920) 1920px, (max-width: 3840) 3840px, 100vw"
                      src={image.desktopImage}
                      alt="The Do-Over Damsel Conquers the Dragon Emperor"
                      className="hidden size-full object-cover object-right-top md:block"
                    />
                  </div>

                  <div className="carousel-card-title">
                    <Link
                      tabIndex={tabIndex}
                      href="/#"
                      prefetch={false}
                      className="carousel-card-logo"
                    >
                      <figure className="relative size-full">
                        <Image
                          fill
                          priority
                          sizes="(max-width: 960px) 320px, (max-width: 1260px) 480px, 600px"
                          src={image.imageName}
                          alt="The Do-Over Damsel Conquers the Dragon Emperor"
                        />

                        <figcaption className="carousel-card-seo-title">
                          The Do-Over Damsel Conquers the Dragon Emperor
                        </figcaption>
                      </figure>
                    </Link>
                  </div>

                  <div className="carousel-card-body">
                    <div className="meta-tags mb-5 mt-3.5 sm:mb-8 md:mt-5 lg:mb-2 2xl:mt-8">
                      <span>14+</span>
                      <span className="rhombus">Sub | Dub</span>
                      <span className="rhombus">Action, Adventure</span>
                    </div>

                    <p className="carousel-card-description">
                      Goku and company were living peaceful lives when they
                      suddenly turned small due to a conspiracy! When they
                      discover that the reason for this may lie in a world known
                      as the "Demon Realm", a mysterious young Majin named
                      Glorio appears before them.
                    </p>

                    <ContentActionButtons
                      tabIndex={tabIndex}
                      watchActionhref="/#"
                      watchActionText="Start Watching E1"
                    />
                  </div>
                </div>

                <div className="carousel-card-sizer" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="container-cmp carousel-navigation-arrow right-0 px-0">
        <button
          aria-label="Next slide"
          data-index={(currentActiveCard + 1) % images.length}
          onClick={changeCurrentActiveCard}
        >
          <FaChevronRight />
        </button>
      </div>

      <div className="container-cmp relative flex w-full justify-center pt-6 sm:pt-[38px] md:justify-start md:pt-7 lg:pt-[48px] 2xl:pt-[64px]">
        {images.map((image, index) => (
          <button
            key={image.key}
            aria-current={currentActiveCard === index}
            aria-label={`Show slide ${index + 1} of ${images.length}`}
            data-index={index}
            onClick={changeCurrentActiveCard}
            className="navigatin-button"
          >
            <div className="app-transition-colors flex size-full overflow-hidden rounded bg-[var(--pill-color)] duration-500">
              <span onAnimationEnd={nextSlide} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
