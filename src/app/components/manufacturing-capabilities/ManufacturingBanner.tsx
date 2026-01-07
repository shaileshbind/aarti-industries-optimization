import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { DigitalBannerProps } from "@/app/types/digital-transformation.type";

const ManufacturingBanner: React.FC<DigitalBannerProps> = ({ data }) => {
  const { title, description, image,mobImage,ctaButton } = data;

  return (
    <HeroBanner
      tag={title}
      title={description}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      btnLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`} 
      btnTitle={ctaButton?.title}
      useTargetBlank={ctaButton?.hasExternalLink === "true"}
    />
  );
};

export default ManufacturingBanner;
