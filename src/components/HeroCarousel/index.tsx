import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./HeroCarousel.module.css";

import { images } from "../../assets/Slider";
import { PlayIcon, YellowBookmarkIcon } from "../../assets/Icons";

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
              active-slide={index === currentIndex ? "true" : undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${images.length}`}
            >
              <div className={styles.carousel_card_container}>
                <div className={styles.carousel_card_layout}>
                  <div className={styles.carousel_card_layout_grid}>
                    <div className={styles.carousel_card_background}>
                      <img
                        loading="eager"
                        src={item.image}
                        alt={item.imageName}
                      />
                    </div>

                    {/* <div className={styles.carousel_card_logo}>
                      <Link to="/">
                        <img
                          loading="eager"
                          src={item.imageName}
                          alt={item.imageName}
                          className="responsive-image relative"
                        />
                      </Link>
                    </div> */}

                    {/* <div className={styles.carousel_card_body}>
                      <h2 className={styles.carousel_card_seo_title}>
                        Firefighter Daigo: Rescuer in Orange
                      </h2>

                      <div className={styles.carousel_card_meta_tags}>
                        <span className={styles.carousel_card_meta_tags_text}>
                          Subtitled
                        </span>

                        <span className={styles.carousel_card_meta_tags_text}>
                          Drama
                        </span>
                      </div>

                      <div className={styles.carousel_card_button_group}>
                        <Link
                          to="/"
                          className={`${styles.carousel_card_button} ${styles.carousel_card_button_one}`}
                        >
                          <span
                            className={styles.carousel_card_button_one_text}
                          >
                            <img src={PlayIcon} alt="play-icon" />
                            Start Watching S1 E1
                          </span>
                        </Link>

                        <div className={styles.button_tooltip}>
                          <div className={styles.bookmark_button}>
                            <span>
                              <img
                                src={YellowBookmarkIcon}
                                alt="bookmark-icon"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
      </div>
    </div>
  );
};

export default HeroCarousel;

{
  /* <div className={styles.carousel_navigation_container}>
  <div className={styles.carousel_navigation}>
    <div className={styles.carousel_navigation_wrapper}>
      {images.map((item, index) => (
        <button
          key={item.image}
          className={styles.carousel_navigation_button}
          data-index={index}
          aria-current={currentIndex === index ? "true" : "false"}
          aria-label={`Show Slide ${index + 1} of ${images.length}`}
          onClick={() => setCurrentIndex(index)}
        >
          <div className={styles.carousel_navigation_button_pill}>
            <span></span>
          </div>
        </button>
      ))}
    </div>
  </div>
</div>; */
}
