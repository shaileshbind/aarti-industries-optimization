"use client";
import { useEffect, useState } from "react";
import HeroBanner from "../banners/HeroBanner";
import { CampusBannerProps } from "@/app/types/campus.type";
import { isMobile } from "react-device-detect";

const CampusBanner = ({ data }: CampusBannerProps) => {
  const [isClientMobile, setIsClientMobile] = useState(false);
  useEffect(() => {
    setIsClientMobile(isMobile);
  }, []);
  const { title, sectionTitle, ctaButton, description, image, mobImage } = data;

  return (
    <HeroBanner
      tag={sectionTitle}
      title={title}
      desc={description}
      btnLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`} 
      btnTitle={ctaButton?.title}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      useTargetBlank={ctaButton?.hasExternalLink === "true"}
      showStar3={!isClientMobile}
    />
  );
};

export default CampusBanner;
