import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { AnnualRBannerProps } from "@/app/types/annual-reports.type";

const AnnualRBanner = ({ data }: AnnualRBannerProps) => {
  const { title, description, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
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

export default AnnualRBanner;
