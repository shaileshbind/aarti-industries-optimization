import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { NewsBannerProps } from "@/app/types/news.type";

const NewsBanner = ({ data }: NewsBannerProps) => {
  const { title, image, mobImage } = data;

  return (
    <div>
      <HeroBanner
        title={title}
        fullBg
        centerText={true}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
        showStar3={false}
      />
    </div>
  );
};

export default NewsBanner;
