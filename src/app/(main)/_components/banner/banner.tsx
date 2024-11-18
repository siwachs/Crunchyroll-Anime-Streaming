"use client";

import { useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiOutlinePlay } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import images from "@/assets/banner";
import "./banner.css";

const Banner = () => {
  const [currentActiveCard, setCurrentActiveCard] = useState(5);

  function changeCurrentActiveCard(e: MouseEvent) {
    const { target } = e;

    const element = (target as HTMLElement).closest("button");
    const dataIndex = element?.getAttribute("data-index");

    setCurrentActiveCard(parseInt(dataIndex!));
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
        {images.map((image, index) => (
          <div
            key={image.key}
            aria-current={currentActiveCard === index}
            role="group"
            aria-roledescription="Slide"
            aria-label={`${index + 1} of ${images.length}`}
            className="carousel-card"
          >
            <div className="container-cmp carousel-card-grid">
              <div className="carousel-card-bg">
                <Image
                  priority={currentActiveCard === index}
                  fill
                  sizes="(max-width: 420px) 420px, 100vw"
                  src={image.mobileImage}
                  alt="The Do-Over Damsel Conquers the Dragon Emperor"
                  className="block size-full object-cover object-[center_top] md:hidden"
                />

                <Image
                  priority={currentActiveCard === index}
                  fill
                  sizes="(max-width: 960px) 960px, (max-width: 1350px) 1350px, (max-width: 1920) 1920px, (max-width: 3840) 3840px, 100vw"
                  src={image.desktopImage}
                  alt="The Do-Over Damsel Conquers the Dragon Emperor"
                  className="hidden size-full object-cover object-right-top md:block"
                />
              </div>

              <div className="carousel-card-title">
                <div className="carousel-card-label" />
                <Link href="/" className="carousel-card-logo">
                  <Image
                    fill
                    priority={currentActiveCard === index}
                    sizes="(max-width: 960px) 320px, (max-width: 1260px) 480px, 600px"
                    src={image.imageName}
                    alt="The Do-Over Damsel Conquers the Dragon Emperor"
                  />
                </Link>
              </div>

              <div className="carousel-card-body">
                <h2 className="carousel-card-seo-title">
                  The Do-Over Damsel Conquers the Dragon Emperor
                </h2>

                <div className="carousel-card-meta-tags">
                  <span>14+</span>
                  <span className="rhombus">Sub | Dub</span>
                  <span className="rhombus">
                    Action, Adventure, Comedy, Fantasy, Supernatural
                  </span>
                </div>

                <p className="carousel-card-description">
                  Jill breaks out of prison the night before she’s set to be
                  executed by her fiancé, Crown Prince Gerald. She’s struck by
                  an arrow while escaping, but instead of dying, she’s
                  transported six years into the past—to the night she and
                  Gerald met. Desperate to alter fate, she instead proposes to
                  the first man she sees, Hadis Teos Rave, her enemy in the
                  future. This is her last chance to get it right!
                </p>

                <div className="relative flex justify-center gap-x-3 sm:inline-flex md:justify-start lg:gap-x-2.5">
                  <Link
                    href="/"
                    className="carousel-card-watch-button carousel-card-button"
                  >
                    <span>
                      <HiOutlinePlay strokeWidth={2.08} className="size-6" />
                      Start Watching E1
                    </span>
                  </Link>

                  <button className="carousel-card-watchlist-button carousel-card-button">
                    <span>
                      <HiOutlineBookmark className="size-[22px]" />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="carousel-card-sizer" />
          </div>
        ))}
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

      <div className="relative flex w-full justify-center px-5 pt-6 text-white sm:px-10 sm:pt-[38px] md:justify-start md:pt-7 lg:px-16 lg:pt-[48px] 2xl:px-20 2xl:pt-[64px]">
        {images.map((image, index) => (
          <button
            key={image.key}
            aria-current={currentActiveCard === index}
            aria-label={`Show slide ${index + 1} of ${images.length}`}
            data-index={index}
            onClick={changeCurrentActiveCard}
            className="navigatin-button"
          >
            <div>
              <span />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
