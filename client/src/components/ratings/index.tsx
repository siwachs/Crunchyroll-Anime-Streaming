import AverageRating from "./averageRating";

import { StarOutlined, StarFull, StarHalf } from "@/assets/ratingIcons";

import "./index.css";

const Ratings: React.FC<{
  averageRating: number;
  totalRating: number;
}> = ({ averageRating, totalRating }) => {
  return (
    <div className="flex items-center">
      <div className="star-rating-controls">
        {[...new Array(5)].map((_, index) => {
          let StarIcon = StarOutlined;

          if (averageRating >= index + 1) StarIcon = StarFull;
          else if (averageRating >= index + 0.5) StarIcon = StarHalf;

          return (
            <button
              title="Star Review"
              key={index}
              className="star-rating-control outline-xs cursor-pointer px-1 first:pl-0 md:p-0"
            >
              <StarFull className="hidden size-7 fill-current" />
              <StarIcon className="inline-block size-7 fill-current" />
              <StarOutlined className="hidden size-7 fill-current" />
            </button>
          );
        })}
      </div>

      <AverageRating
        averageRating={averageRating}
        totalRating={totalRating}
        className="ml-2"
      />
    </div>
  );
};

export default Ratings;
