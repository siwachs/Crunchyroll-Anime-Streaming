"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { HiOutlinePlay } from "react-icons/hi2";
import { HiOutlineBookmark } from "react-icons/hi";

import images from "@/assets/banner";
import "./banner.css";

const Banner = () => {
  const [activeCard, setActiveCard] = useState(5);

  return (
    <>
      <div className="relative">
        <div className="hidden"></div>

        <div className="carousel-cards relative grid">
          {images.map((image, index) => (
            <div
              key={image.key}
              data-active={activeCard === index}
              className="carousel-card relative z-0 hidden opacity-0"
            >
              <div className="carousel-card-container">
                <div className="carousel-card-grid">
                  <div className="carousel-card-bg">
                    <picture>
                      <Image
                        sizes="(max-width: 568px) 90vw, 100vw"
                        fill
                        priority={activeCard === index}
                        src={image.image}
                        alt={`card-image-${index}`}
                        className="block h-full w-full object-cover object-[center_top]"
                      />
                    </picture>
                  </div>

                  <div className="carousel-card-title">
                    <Link href="/">
                      <Image
                        sizes="(max-width: 568px) 90vw, 100vw"
                        fill
                        priority={activeCard === index}
                        src={image.imageName}
                        alt={`card-name-${index}`}
                      />
                    </Link>
                  </div>

                  <div className="carousel-card-body">
                    <h2 className="carausel-card-seo-title">
                      [No RU] Blue Exorcist S4
                    </h2>

                    <div className="mb-5 mt-3 inline-block select-none truncate text-[var(--meta-color)]">
                      <span className="mb-5 mt-3 inline-block">14+</span>
                      <span className="rhombus relative inline text-sm/leading-4.5">
                        Sub | Dub
                      </span>
                      <span className="rhombus relative inline text-sm/leading-4.5">
                        Action, Adventure, Comedy, Fantasy, Supernatural
                      </span>
                    </div>

                    <p className="carausel-card-description"></p>

                    <div className="carausel-card-button-group">
                      <Link href="/" className="carausel-card-watch-button">
                        <span>
                          <HiOutlinePlay strokeWidth={2} className="size-6" />
                          Start Watching S1 E1
                        </span>
                      </Link>

                      <button className="carausel-card-add-to-watchlist-button tooltip">
                        <span>
                          <HiOutlineBookmark className="size-6" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="carousel-card-sizer" />
              </div>
            </div>
          ))}
        </div>

        <div className="hidden"></div>

        <div className="mx-auto w-full px-5 pt-8">
          <div className="flex justify-center">
            {images.map((image, index) => (
              <button
                key={image.key}
                aria-current={activeCard === index}
                className="navigation-button"
              >
                <div>
                  <span />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
