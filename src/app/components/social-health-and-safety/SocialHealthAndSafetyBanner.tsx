import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { SocialHealthAndSafetyBannerProps } from "@/app/types/social-health-and-safety.type";

const SocialHealthAndSafetyBanner = ({ data }: SocialHealthAndSafetyBannerProps) => {
  const { title, tag, image, mobImage, btnTitle, btnLink } = data;
  return (
    <HeroBanner
      tag={tag}
      leftDesc={true}
      title={title}
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

export default SocialHealthAndSafetyBanner;
