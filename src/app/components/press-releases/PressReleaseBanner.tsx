"use client";
import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { PressReleaseBannerProps } from "@/app/types/press-release.type";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const PressReleaseBanner: React.FC<PressReleaseBannerProps> = ({ data }) => {
  const { sectionTitle, description, image, mobImage } = data;
  const isMobile = useMatchMedia("(max-width:820px)");

  return (
    <HeroBanner
      title={sectionTitle}
      desc={description}
      fullBg
      leftDesc={isMobile}
      centerText={!isMobile}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default PressReleaseBanner;
