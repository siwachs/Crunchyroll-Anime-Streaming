import Link from "next/link";
import Image from "next/image";

import promotionBannerImage from "@/assets/promotionBanner/promotionBanner.avif.avif";
import promotionBannerImageLarge from "@/assets/promotionBanner/promotionBannerLarge.avif";

const PromotionBanner: React.FC<{ dataId: string }> = ({ dataId }) => {
  return (
    <div data-id={dataId}>
      <div className="container-cmp container-cmp-has-max-width">
        <Link
          href={`/series/${83290}/${encodeURIComponent("Dragon Ball Z".toLowerCase().replaceAll(" ", "-"))}`}
          prefetch={false}
          className="relative block"
        >
          <div className="h-0 pt-[44.78%]" />
          <div className="absolute inset-0">
            <Image
              sizes="(max-width: 568px) 1080px, 100vw"
              src={promotionBannerImage}
              alt="promotion-banner"
              className="block size-full object-cover sm:hidden"
            />
            <Image
              sizes="(max-width: 2700px) 2700px, 100vw"
              src={promotionBannerImageLarge}
              alt="promotion-banner"
              className="hidden size-full object-cover sm:block"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PromotionBanner;
