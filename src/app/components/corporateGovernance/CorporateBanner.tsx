import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { CorporateBannerProps } from "@/app/types/corporate-governance.type";

const CorporateBanner: React.FC<CorporateBannerProps> = ({ data }) => {
  const { title, description, image,mobImage, btnTitle, btnLink } = data;

  return (
    <HeroBanner
      // tag={title}
      leftDesc={true}
      title={title}
      desc={description}
      btnTitle={btnTitle}
      btnLink={btnLink}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default CorporateBanner;
