import React, { useState } from "react";

import styles from "./HeroCarousel.module.css";

import { images } from "../../assets/Slider";

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div>
      <div className={styles.hero_carousel_card_wrapper}>
        <div className={styles.hero_carousel_item}>
          <div className={styles.hero_carousel_card}>
            <div className={styles.hero_carousel_layout}>
              <div className={styles.hero_carousel_layout_grid}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
