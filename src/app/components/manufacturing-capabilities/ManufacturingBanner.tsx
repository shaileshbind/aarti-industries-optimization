import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { DigitalBannerProps } from "@/app/types/digital-transformation.type";

const ManufacturingBanner: React.FC<DigitalBannerProps> = ({ data }) => {
  const { title, description, image,mobImage } = data;

  return (
    <HeroBanner
      tag={title}
      title={description}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default ManufacturingBanner;
