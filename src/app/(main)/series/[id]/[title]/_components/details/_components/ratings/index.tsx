import { HiOutlineStar } from "react-icons/hi2";
import { FaCaretDown } from "react-icons/fa";

import "./index.css";

const ratingPercentages = [92, 3, 2, 1, 4];

const Ratings: React.FC = () => {
  return (
    <div className="ratings-wrapper">
      <div className="star-rating-controls">
        {[...new Array(5)].map((_, index) => (
          <button title="Star Review" key={index}>
            <HiOutlineStar />
          </button>
        ))}
      </div>

      <div className="relative">
        <button className="star-rating-average-button">
          <span>Average Rating:</span>
          <span>4.8 (36.7k)</span>
          <FaCaretDown className="size-4" />
        </button>

        <div className="star-rating-average-data hidden">
          <div className="star-rating-average-tooltip">
            <div className="mb-3">
              <span className="text-sm/leading-4.5 font-medium">
                Average 4.8 out of 5 stars
              </span>
              <span className="flex pt-3 text-xs font-semibold">
                36747 ratings
              </span>
            </div>

            {ratingPercentages.map((ratingPercentage, index) => (
              <div key={index} className="flex items-center pb-1.5 pt-2">
                <HiOutlineStar className="mr-2 size-4.5 flex-[0_0_auto] fill-current" />

                <p className="text-sm/leading-4.5 font-medium">{5 - index}</p>

                <div className="m-2.5 h-2 flex-[1_1_auto] bg-[#0009]">
                  <div
                    className="h-full bg-white"
                    style={{ width: `${ratingPercentage}%` }}
                  />
                </div>

                <p className="w-10 text-sm/leading-4.5 font-medium">
                  {ratingPercentage}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
