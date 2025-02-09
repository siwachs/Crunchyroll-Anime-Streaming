import { getCompactNotation } from "@/lib/utils";

import { FaCaretDown } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";

import "./index.css";

const ratingPercentages = [92, 3, 2, 1, 4];

const AverageRating: React.FC<{
  averageRating: number;
  totalRating: number;
  className?: string;
}> = ({ averageRating, totalRating, className = "" }) => {
  const compactTotalRating = getCompactNotation(totalRating);

  return (
    <div className={`relative ${className}`}>
      <button className="star-rating-average-button outline-xs">
        <span className="text-sm/leading-4.5 2sm:initial hidden font-semibold text-[var(--app-icon-primary)]">{`Average Rating: `}</span>
        <span>{averageRating}</span>
        <span>({compactTotalRating})</span>
        <FaCaretDown className="ml-0.5 size-3.5" />
      </button>

      <div className="star-rating-average-data hidden">
        <div className="star-rating-average-tooltip">
          <div className="mb-3">
            <span className="text-sm/leading-4.5 font-medium">
              Average {averageRating} out of 5 stars
            </span>

            <span className="flex pt-3 text-xs font-semibold">
              {totalRating} ratings
            </span>
          </div>

          {ratingPercentages.map((ratingPercentage, index) => (
            <div key={index} className="flex items-center pt-2 pb-1.5">
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

              <p className="text-sm/leading-4.5 w-10 font-medium sm:text-base">
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
