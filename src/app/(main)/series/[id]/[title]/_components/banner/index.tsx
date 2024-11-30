import Image from "next/image";

import tallImage from "@/assets/series/banner-tall.jpeg";
import "./index.css";

const Banner: React.FC = () => {
  return (
    <div className="banner-wrapper">
      <div className="blurred-wrapper">
        {/* <div className="wide-image blurred">
          <figure className="absolute inset-0">
            <Image
              fill
              src={tallImage}
              alt="Dragon Ball DAIMA"
              className="block size-full object-cover"
            />
          </figure>
        </div> */}

        <div className="tall-image blurred">
          <figure className="absolute inset-0">
            <Image
              fill
              src={tallImage}
              alt="Dragon Ball DAIMA"
              className="block size-full object-cover"
            />
          </figure>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="background-wrapper">
          <div className="background-image">
            <div className="tall-image">
              <Image
                priority
                src={tallImage}
                alt="Dragon Ball DAIMA"
                className="block size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
