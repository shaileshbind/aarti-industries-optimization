import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { LAABannerProps } from "@/app/types/life-at-aarti.type";

const LifeAtBanner = ({ data }: LAABannerProps) => {
  const { sectionTitle, title, image, mobImage, ctaButtons, description } =
    data;
  return (
    <div>
      <HeroBanner
        tag={sectionTitle}
        title={title}
        desc={description}
        btnTitle={ctaButtons?.title}
        btnLink={ctaButtons?.link}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
      />
    </div>
  );
};

export default LifeAtBanner;
