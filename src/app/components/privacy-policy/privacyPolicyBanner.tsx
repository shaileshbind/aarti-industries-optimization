"use client";
import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ImageProps } from "@/app/types/global.type";
import { useMediaQuery } from "@mui/material";

export type PrivacyPolicyProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

const PrivacyPolicyBanner: React.FC<PrivacyPolicyProps> = ({ data }) => {
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
    />
  );
};

export default PrivacyPolicyBanner;
