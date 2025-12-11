import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { GRBannerProps } from "@/app/types/global-reach.type";

const GRBanner = ({ data }: GRBannerProps) => {
  const { heading, sectionTitle, image, mobImage } = data;
  return (
    <HeroBanner
      tag={sectionTitle}
      title={heading}
      image={image?.url}
      fullBg
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default GRBanner;
