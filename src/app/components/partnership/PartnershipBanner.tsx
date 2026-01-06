import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { PartnershipBannerProps } from "@/app/types/partnership.type";

const PartnershipBanner: React.FC<PartnershipBannerProps> = ({ data }) => {
  const { title, image, mobImage, ctaButtons, sectionTitle } = data;

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
        secondaryBtnLeftLink={ctaButtons?.[0]?.link?.link}
        secondaryBtnRightTitle={ctaButtons?.[1]?.title}
        secondaryBtnRightLink={ctaButtons?.[1]?.link?.link}
        secondaryBtnFormTitle={sectionTitle}
      />
    </div>
  );
};

export default PartnershipBanner;
