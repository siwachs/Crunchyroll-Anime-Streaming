import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const BottomControls: React.FC = () => {
  return (
    <div className="bottom-controls">
      <hr className="horizontal-rule" />

      <div className="bottom-controls-wrapper">
        <button disabled>
          <FaChevronLeft className="mr-1.5 size-3.5" />

          <span className="text-sm/leading-4.5 font-black">
            <span className="sm:initial hidden">Previous season</span>
            <span className="sm:hidden">Previous</span>
          </span>
        </button>

        <button>
          <span className="text-sm/leading-4.5 font-black">
            <span className="sm:initial hidden">Next season</span>
            <span className="sm:hidden">Next</span>
          </span>

          <FaChevronRight className="ml-1.5 size-3.5" />
        </button>
      </div>
    </div>
  );
};

export default BottomControls;
