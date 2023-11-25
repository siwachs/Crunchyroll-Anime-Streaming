import React from "react";

import HeroCarousel from "../components/HeroCarousel";

import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.app_body_wrapper}>
      <div className={`${styles.page_wrapper} ${styles.page_home}`}>
        <div className={styles.feeds}>
          <HeroCarousel />
          {/* More feed go here */}
        </div>
      </div>
    </div>
  );
};

export default Home;
