import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { CDMOBannerProps } from "@/app/types/cdmo.type";

const CDMOBanner: React.FC<CDMOBannerProps> = ({ data }) => {
  const { title, sectionTitle, ctaButton, description, image } = data;

  return (
    <HeroBanner
      tag={sectionTitle}
      title={title}
      desc={description}
      btnLink={ctaButton?.link || "#"}
      btnTitle={ctaButton?.title}
      image={image?.url}
    />
  );
};

export default CDMOBanner;
