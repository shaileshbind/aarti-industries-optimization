'use client'
import React, { useEffect, useState } from "react";
import HeroBanner from "../banners/HeroBanner";
import { CDMOBannerProps } from "@/app/types/cdmo.type";
import { isMobile } from "react-device-detect";

const CDMOBanner: React.FC<CDMOBannerProps> = ({ data }) => {
   const [isClientMobile, setIsClientMobile] = useState(false);
    useEffect(() => {
      setIsClientMobile(isMobile);
    }, []);
  const { title, sectionTitle, ctaButton, description, image,mobImage } = data;

  return (
    <HeroBanner
      tag={sectionTitle}
      title={title}
      desc={description}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      popupButtonTitle={ctaButton?.title}
      popupButton={true}
      showStar3={!isClientMobile}
    />
  );
};

export default CDMOBanner;
