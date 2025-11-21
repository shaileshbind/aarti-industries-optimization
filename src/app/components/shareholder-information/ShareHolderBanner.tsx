import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ShareHolderBannerProps } from "@/app/types/shareholder.type";

const ShareHolderBanner: React.FC<ShareHolderBannerProps> = ({ data }) => {
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

export default ShareHolderBanner;
