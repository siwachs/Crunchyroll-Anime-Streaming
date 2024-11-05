"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import images from "@/assets/banner";
import "./banner.css";

const Banner = () => {
  const [activeCard, setActiveCard] = useState(5);

  return (
    <div className="relative">
      <div className="carousel-cards">
        {images.map((image, index) => (
          <div
            key={image.key}
            data-active={activeCard === index}
            className="carousel-card"
          >
            <div className="carousel-card-container">
              <div className="carousel-card-container-grid">
                <div className="carousel-card-container-bg">
                  <div className="carousel-card-container-image">
                    <Image
                      fill
                      src={image.image}
                      alt={`card-image-${index}`}
                      className="block h-full w-full object-cover object-[center_top]"
                    />
                  </div>

                  <div className="carousel-card-container-name">
                    <Link
                      href="/"
                      className="carousel-card-container-name-image"
                    >
                      <Image
                        fill
                        src={image.imageName}
                        alt={`card-name-${index}`}
                      />
                    </Link>
                  </div>

                  <div className="carousel-card-container-body">
                    <h2 className="sr-only">[No RU] Blue Exorcist S4</h2>

                    <div className="mb-5 mt-3 inline-block select-none overflow-hidden text-ellipsis whitespace-nowrap text-[#a0a0a0]">
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
              </div>

              <div className="carousel-card-container-sizer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
