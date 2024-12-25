import { FaCaretDown } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";

import "./index.css";

const ratingPercentages = [92, 3, 2, 1, 4];

const AverageRating: React.FC<{ mode?: "compact" }> = ({ mode }) => {
  return (
    <div className="relative">
      {mode === "compact" ? (
        <button className="star-rating-average-compact-button">
          <span>4.9</span>
          <HiOutlineStar className="fill-current" />
          <span className="uppercase">(361.2K)</span>
          <FaCaretDown />
        </button>
      ) : (
        <button className="star-rating-average-button">
          <span className="app-transition-colors font-semibold text-[var(--app-icon-primary)]">
            Average Rating:
          </span>
          <span className="font-black uppercase">4.8 (36.7k)</span>
          <FaCaretDown className="ml-1 size-4" />
        </button>
      )}

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

              <p className="text-sm/leading-4.5 font-medium sm:text-base">
                {5 - index}
              </p>

              <div className="m-2.5 h-2 flex-[1_1_auto] bg-[#0009]">
                <div
                  className="h-full bg-white"
                  style={{ width: `${ratingPercentage}%` }}
                />
              </div>

              <p className="w-10 text-sm/leading-4.5 font-medium sm:text-base">
                {ratingPercentage}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AverageRating;
