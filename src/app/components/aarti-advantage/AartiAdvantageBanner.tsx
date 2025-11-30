import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { AartiAdvantageBannerProps } from "@/app/types/aarti-advantage.type";

const AartiAdvantageBanner = ({ data }: AartiAdvantageBannerProps) => {
  const { title, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
      fullBg
      centerText={true}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      showStar3={false}
      lineClassName="hidden md:block"
      bottomMiddleStarClassName="hidden md:block"
    />
  );
};

export default AartiAdvantageBanner;
