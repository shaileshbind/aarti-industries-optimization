"use client";
import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ShareHolderBannerProps } from "@/app/types/shareholder.type";
import useMediaQuery from "@mui/material/useMediaQuery";

const ShareHolderBanner: React.FC<ShareHolderBannerProps> = ({ data }) => {
  const { title, description, image, mobImage } = data;
  const isMobile = useMediaQuery("(max-width:820px)");

  return (
    <HeroBanner
      title={title}
      desc={description}
      fullBg
      leftDesc={isMobile}
      centerText={!isMobile}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      showStar2={false}
      showStar3={false}
    />
  );
};

export default ShareHolderBanner;
