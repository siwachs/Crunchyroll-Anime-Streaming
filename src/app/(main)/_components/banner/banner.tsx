"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import images from "@/assets/banner";
import "./banner.css";

const Banner = () => {
  const [activeCard, setActiveCard] = useState(3);

  return (
    <div className="relative">
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
                  <Image
                    fill
                    sizes="100vw"
                    src={image.image}
                    alt={`card-image-${index}`}
                    className="block h-full w-full object-cover object-[center_top]"
                  />
                </div>

                <div className="carousel-card-title">
                  <Link href="/">
                    <Image
                      fill
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
                </div>
              </div>

              <div className="carousel-card-sizer" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Nav Buttons */}
    </div>
  );
};

export default Banner;
