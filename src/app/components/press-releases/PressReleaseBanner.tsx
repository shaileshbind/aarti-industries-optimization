import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { PressReleaseBannerProps } from "@/app/types/press-release.type";

const PressReleaseBanner: React.FC<PressReleaseBannerProps> = ({ data }) => {
  const { sectionTitle, description, image, mobImage } = data;

  return (
    <HeroBanner
      title={sectionTitle}
      desc={description}
      fullBg
      centerText={true}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default PressReleaseBanner;
