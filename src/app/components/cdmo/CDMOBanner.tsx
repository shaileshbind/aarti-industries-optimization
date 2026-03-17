"use client";
import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { CDMOBannerProps } from "@/app/types/cdmo.type";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const CDMOBanner: React.FC<CDMOBannerProps> = ({ data }) => {
  const isClientMobile = useMatchMedia("(pointer: coarse)");
  const { title, sectionTitle, ctaButton, description, image, mobImage } = data;

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
