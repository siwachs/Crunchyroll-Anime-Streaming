import { getCompactNotation } from "@/lib/utils";

import { FaCaretDown } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";

import "./index.css";

const ratingPercentages = [92, 3, 2, 1, 4];

const AverageRating: React.FC<{
  align?: "right" | "left";
  mode?: "default" | "compact";
  averageRating: number;
  totalRating: number;
  className?: string;
}> = ({
  align = "right",
  mode = "default",
  averageRating,
  totalRating,
  className = "",
}) => {
  const compactTotalRating = getCompactNotation(totalRating);

  return (
    <div className={`relative ${className}`}>
      <button
        className={`star-rating-average-button outline-xs flex cursor-pointer items-center gap-1 text-sm/4.5 font-black ${mode === "compact" ? "text-[var(--app-icon-primary)]" : ""}`}
      >
        {mode === "default" && (
          <span className="2sm:initial xl:initial hidden text-sm/4.5 font-semibold text-[var(--app-icon-primary)] md:hidden">{`Average Rating: `}</span>
        )}
        <span>{averageRating}</span>
        {mode === "compact" && (
          <HiOutlineStar className="size-3.5 fill-current" />
        )}
        <span>({compactTotalRating})</span>
        <FaCaretDown
          className={mode === "compact" ? "size-3" : "ml-0.5 size-3.5"}
        />
      </button>

      <div
        className={`star-rating-average-data ${align === "right" ? "right-0" : "left-0"} hidden`}
      >
        <div className="star-rating-average-tooltip">
          <div className="mb-3">
            <span className="text-sm/4.5 font-medium">
              Average {averageRating} out of 5 stars
            </span>

            <span className="flex pt-3 text-xs font-semibold">
              {totalRating} ratings
            </span>
          </div>

          {ratingPercentages.map((ratingPercentage, index) => (
            <div key={index} className="flex items-center pt-2 pb-1.5">
              <HiOutlineStar className="mr-2 size-4.5 flex-[0_0_auto] fill-current" />

              <p className="text-sm/4.5 font-medium sm:text-base">
                {5 - index}
              </p>

              <div className="m-2.5 h-2 flex-[1_1_auto] bg-[#0009]">
                <div
                  className="h-full bg-white"
                  style={{ width: `${ratingPercentage}%` }}
                />
              </div>

              <p className="w-10 text-sm/4.5 font-medium sm:text-base">
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
