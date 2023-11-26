import React, { useState } from "react";

import styles from "./HeroCarousel.module.css";

import { images } from "../../assets/Slider";

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div>
      <div className={styles.carousel}>
        <div className={styles.carousel_cards}>
          {images.map((item, index) => (
            <div
              key={item.image}
              className={styles.carousel_card}
              active-slide={index === currentIndex ? "" : undefined}
            >
              <div className={styles.carousel_card_layout}>
                <div className={styles.carousel_card_layout_grid}>
                  <div className={styles.carousel_card_background}>
                    <img
                      src={item.image}
                      alt={item.imageName}
                      className="responsive-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
