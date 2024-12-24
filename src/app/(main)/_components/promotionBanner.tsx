import Link from "next/link";
import Image from "next/image";

import promotionBannerImage from "@/assets/promotionBanner/promotionBanner.avif.avif";
import promotionBannerImageLarge from "@/assets/promotionBanner/promotionBannerLarge.avif";

const PromotionBanner: React.FC<{ dataId: string }> = ({ dataId }) => {
  return (
    <div data-id={dataId}>
      <div className="container-cmp container-cmp-has-max-width">
        <Link
          href={`/series/${83290}/${encodeURIComponent("Dragon Ball DAIMA".toLowerCase().replaceAll(" ", "-"))}`}
          prefetch={false}
          className="relative block"
        >
          <div className="h-0 pt-[44.78%] sm:pt-[33.334%]" />
          <figure className="absolute inset-0">
            <Image
              fill
              sizes="580px"
              src={promotionBannerImage}
              alt="promotion-banner"
              className="block size-full object-cover sm:hidden"
            />
            <Image
              fill
              sizes="1080px"
              src={promotionBannerImageLarge}
              alt="promotion-banner"
              className="hidden size-full object-cover sm:block"
            />
          </figure>
        </Link>
      </div>
    </div>
  );
};

export default PromotionBanner;
