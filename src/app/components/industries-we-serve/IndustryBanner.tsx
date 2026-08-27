import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { IndustryBannerProps } from "@/app/types/industries-we-serve.type";

const IndustryBanner: React.FC<IndustryBannerProps> = ({ data }) => {
  const { title, sectionTitle, image, mobImage } = data;

  return (
    <HeroBanner
      tag={sectionTitle}
      title={title}
      image={image?.url}
      fullBg
      mobImage={mobImage?.url}
      alt="img"
      mobAlt="img"
    />
  );
};

export default IndustryBanner;
