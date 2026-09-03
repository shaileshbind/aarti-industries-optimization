import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { WhoBannerProps } from "@/app/types/who-we-are.type";

const WhoBanner: React.FC<WhoBannerProps> = ({ data }) => {
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
      imageClassName="md:object-bottom"
    />
  );
};

export default WhoBanner;
