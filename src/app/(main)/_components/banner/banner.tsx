"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiOutlinePlay } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";

import images from "@/assets/banner";
import "./banner.css";

const Banner = () => {
  const [currentActiveCard, setCurrentActiveCard] = useState(6);

  return (
    <div className="relative">
      <div className="hidden"></div>

      <div className="carousel-cards relative grid">
        {images.map((image, index) => (
          <div
            key={image.key}
            aria-current={currentActiveCard === index}
            className="carousel-card relative z-0 hidden opacity-0"
          >
            <div className="carousel-card-grid">
              <div className="carousel-card-bg">
                <Image
                  priority={currentActiveCard === index}
                  fill
                  sizes="(max-width: 420px) 420px, 100vw"
                  src={image.mobileImage}
                  alt={`card-mobile-image-${index}`}
                  className="block size-full object-cover object-[center_top] md:hidden"
                />

                <Image
                  priority={currentActiveCard === index}
                  fill
                  sizes="(max-width: 960px) 960px, (max-width: 1350px) 1350px, (max-width: 1920) 1920px, (max-width: 3840) 3840px, 100vw"
                  src={image.desktopImage}
                  alt={`card-desktop-image-${index}`}
                  className="hidden size-full object-cover object-[center_top] md:block"
                />
              </div>

              <div className="carousel-card-title">
                <div className="carousel-card-label" />
                <Link href="/" className="carousel-card-logo">
                  <Image
                    priority={currentActiveCard === index}
                    sizes="(max-width: 960px) 320px, (max-width: 1260px) 480px, 600px"
                    src={image.imageName}
                    alt={`card-title-${index}`}
                  />
                </Link>
              </div>

              <div className="carousel-card-body">
                <h2 className="carausel-card-seo-title">
                  Negative Positive Angler
                </h2>

                <div className="carausel-card-meta-tags">
                  <span>14+</span>
                  <span className="rhombus">Sub | Dub</span>
                  <span className="rhombus">
                    Action, Adventure, Comedy, Fantasy, Supernatural
                  </span>
                </div>

                <p className="carausel-card-description">
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
                    className="carausel-card-watch-button carausel-card-button"
                  >
                    <span>
                      <HiOutlinePlay strokeWidth={2.08} className="size-6" />
                      Start Watching S1 E1
                    </span>
                  </Link>

                  <button className="carausel-card-watchlist-button carausel-card-button">
                    <span>
                      <HiOutlineBookmark className="size-6" />
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

      {/* <div className="mx-auto w-full px-5 pt-8">
        <div className="flex justify-center">
          {images.map((image, index) => (
            <button
              key={image.key}
              aria-current={currentActiveCard === index}
              className="navigation-button"
            >
              <div>
                <span />
              </div>
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Banner;
