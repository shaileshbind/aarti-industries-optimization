import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ImageProps } from "@/app/types/global.type";

export type FinancialBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

const FinancialBanner: React.FC<FinancialBannerProps> = ({ data }) => {
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
      lineClassName="hidden md:block"
      bottomMiddleStarClassName="hidden md:block"
    />
  );
};

export default FinancialBanner;
