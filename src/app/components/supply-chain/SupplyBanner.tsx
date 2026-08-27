import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { SupplyChainBannerProps } from "@/app/types/supply-chain.type";

const SupplyChainBanner: React.FC<SupplyChainBannerProps> = ({ data }) => {
  const { title, description, image, mobImage } = data;

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

export default SupplyChainBanner;
