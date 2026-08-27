"use client";
import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ThriveBannerProps } from "@/app/types/thrive-at-aarti.type";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const ThriveBanner: React.FC<ThriveBannerProps> = ({ data }) => {
  const isClientMobile = useMatchMedia("(pointer: coarse)");
  const { title, pageHeading, ctaButton, description, image, mobImage } = data;

  return (
    <HeroBanner
      tag={pageHeading}
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

export default ThriveBanner;
