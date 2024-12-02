import { HiOutlineStar } from "react-icons/hi2";

import "./index.css";

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
      <div></div>
    </div>
  );
};

export default Ratings;
