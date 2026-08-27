import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { CorporateBannerProps } from "@/app/types/corporate-governance.type";

const CorporateBanner: React.FC<CorporateBannerProps> = ({ data }) => {
  const { title, description, image, mobImage, ctaButton } = data;

  return (
    <HeroBanner
      leftDesc={true}
      title={title}
      desc={description}
      btnLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`}
      btnTitle={ctaButton?.title}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      useTargetBlank={ctaButton?.hasExternalLink === "true"}
    />
  );
};

export default CorporateBanner;
