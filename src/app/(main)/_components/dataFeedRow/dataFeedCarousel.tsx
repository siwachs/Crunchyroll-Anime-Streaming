"use client";

import Link from "next/link";
import Image from "next/image";

import images from "@/assets/dataFeed";

const DataFeedCarousel = () => {
  return (
    <div className="container-cmp wide-cards-carousel-layout px-0">
      <div className="container-cmp wide-cards-carousel-container">
        {/* Nav Left */}

        <div className="wide-cards-carousel-frame">
          <div className="carousel-scroller">
            <div className="carousel-scroller-wrapper">
              <div className="carousel-scroller-track">
                {images.map((image) => (
                  <div key={image.key} className="carousel-scroller-card">
                    <div className="browse-card">
                      <Link
                        href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                        prefetch={false}
                        tabIndex={-1}
                        className="relative block"
                      >
                        <div className="browse-card-image browse-card-image-sized">
                          <div className="browse-card-image-wrapper">
                            <div className="browse-card-image-sizer">
                              <Image
                                sizes="(min-width: 2160px) calc(100vw / 7), (min-width: 1720px) calc(100vw / 6), (min-width: 800px) calc(100vw / 5), (min-width: 568px) calc(100vw / 4), (min-width: 480px) calc(100vw / 3), 50vw"
                                src={image.image}
                                alt={image.title}
                                className="block size-full object-cover"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>

                      <div className="browse-card-body">
                        <h4 className="browse-card-body-title">
                          <Link
                            href={`/series/${83290}/${encodeURIComponent(image.title.toLowerCase().replaceAll(" ", "-"))}`}
                            prefetch={false}
                            tabIndex={-1}
                          >
                            {image.title}
                          </Link>
                        </h4>

                        <div className="browse-card-body-metatags">
                          <span>Subtitled</span>
                        </div>
                      </div>

                      <div className="browse-card-hover">
                        <div className="browse-card-hover-content"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nav Right */}
      </div>
    </div>
  );
};

export default DataFeedCarousel;
