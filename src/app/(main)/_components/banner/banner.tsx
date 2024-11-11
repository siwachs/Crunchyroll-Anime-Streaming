"use client";

import { useState, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiOutlinePlay } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";

import images from "@/assets/banner";
import "./banner.css";

const Banner = () => {
  const [currentActiveCard, setCurrentActiveCard] = useState(6);

  function changeCurrentActiveCard(e: MouseEvent) {
    const { target } = e;

    const element = (target as HTMLElement).closest("button");
    const dataIndex = element?.getAttribute("data-index");

    setCurrentActiveCard(parseInt(dataIndex!));
  }

  return (
    <div className="relative z-0">
      <div className="hidden"></div>

      <div className="carousel-cards">
        {images.map((image, index) => (
          <div
            key={image.key}
            aria-current={currentActiveCard === index}
            className="carousel-card"
          >
            <div className="carousel-card-grid">
              <div className="carousel-card-bg">
                <Image
                  priority={currentActiveCard === index}
                  fill
                  sizes="(max-width: 420px) 420px, 100vw"
                  src={image.mobileImage}
                  alt="Negative Positive Angler"
                  className="block size-full object-cover object-[center_top] md:hidden"
                />

                <Image
                  priority={currentActiveCard === index}
                  fill
                  sizes="(max-width: 960px) 960px, (max-width: 1350px) 1350px, (max-width: 1920) 1920px, (max-width: 3840) 3840px, 100vw"
                  src={image.desktopImage}
                  alt="Negative Positive Angler"
                  className="hidden size-full object-cover object-[center_top] md:block"
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
                    alt="Negative Positive Angler"
                  />
                </Link>
              </div>

              <div className="carousel-card-body">
                <h2 className="carousel-card-seo-title">
                  Negative Positive Angler
                </h2>

                <div className="carousel-card-meta-tags">
                  <span>14+</span>
                  <span className="rhombus">Sub | Dub</span>
                  <span className="rhombus">
                    Action, Adventure, Comedy, Fantasy, Supernatural
                  </span>
                </div>

                <p className="carousel-card-description">
                  Tsunehiro’s life isn’t easy. After a doctor gives him two
                  years to live and debt collectors come knocking, he falls from
                  a bridge. In the knick of time, Hana and her crew spot
                  Tsunehiro and pull him to safety. Before returning, they
                  anchor offshore to fish and Tsunehiro catches a huge sea bass
                  in a bout of beginner’s luck. As his apartment building
                  crumbles, Tsunehiro’s new life begins to unfold!
                </p>

                <div className="relative flex justify-center gap-x-3">
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

      <div className="hidden"></div>

      <div className="relative flex w-full justify-center px-5 pt-6 text-white">
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
