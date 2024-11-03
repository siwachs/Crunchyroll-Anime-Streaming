"use client";

import { useState } from "react";
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
              <Image src={image.image} alt={`card-${index + 1}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
