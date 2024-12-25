import Image from "next/image";

import tallImage from "@/assets/series/banner-tall.jpeg";
import wideImage from "@/assets/series/banner-wide.jpg";
import "./index.css";

const Banner: React.FC = () => {
  return (
    <div className="banner-wrapper">
      <div className="blurred-wrapper">
        <div className="tall-image blurred">
          <figure className="absolute inset-0">
            <Image
              fill
              priority
              sizes="580px"
              src={tallImage}
              alt="Dragon Ball DAIMA"
              className="block size-full object-cover"
            />
          </figure>
        </div>

        <div className="wide-image blurred">
          <figure className="absolute inset-0">
            <Image
              fill
              priority
              sizes="(max-width: 1720px) 1720px, 100vw"
              src={wideImage}
              alt="Dragon Ball DAIMA"
              className="block size-full object-cover"
            />
          </figure>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="background-wrapper">
          <div className="tall-image">
            <figure className="absolute inset-0">
              <Image
                fill
                priority
                sizes="580px"
                src={tallImage}
                alt="Dragon Ball DAIMA"
                className="block size-full object-cover"
              />
            </figure>
          </div>

          <div className="wide-image">
            <figure className="absolute inset-0">
              <Image
                fill
                priority
                sizes="(max-width: 1720px) 1720px, 100vw"
                src={wideImage}
                alt="Dragon Ball DAIMA"
                className="block size-full object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
