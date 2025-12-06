import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { MahasuperBannerProps } from "@/app/types/mahasuper.type";

const MahasuperBanner = ({ data }: MahasuperBannerProps) => {
  const { title, image, mobImage, btnTitle, btnLink } = data;
  return (
    <HeroBanner
      // tag={title}
      leftDesc={true}
      title={title}
      // desc={description}
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

export default MahasuperBanner;
