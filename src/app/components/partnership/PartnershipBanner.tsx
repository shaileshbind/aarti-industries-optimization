import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { PartnershipBannerProps } from "@/app/types/partnership.type";

const PartnershipBanner: React.FC<PartnershipBannerProps> = ({ data }) => {
  const { title, image, mobImage, ctaButtons } = data;

  return (
    <div>
      <HeroBanner
        fullBg
        title={title}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText || "banner"}
        mobAlt={image?.alternativeText || "banner"}
        secondaryBtnLeftTitle={ctaButtons?.[0]?.title}
        secondaryBtnLeftLink={ctaButtons?.[0]?.link || "#"}
        secondaryBtnRightTitle={ctaButtons?.[1]?.title}
        secondaryBtnRightLink={ctaButtons?.[1]?.link || "#"}
      />
    </div>
  );
};

export default PartnershipBanner;
