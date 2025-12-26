'use client'
import { useState, useEffect } from "react";
import { isDesktop } from "react-device-detect";
import HeroBanner from "../banners/HeroBanner";
import { MediaBannerProps } from "@/app/types/media-kit.type";

const MediaBanner = ({ data }: MediaBannerProps) => {
  const { title, image, mobImage } = data;
  const [isClientDesktop, setIsClientDesktop] = useState(false);
  useEffect(() => {
    setIsClientDesktop(isDesktop);
  }, []);

  return (
    <HeroBanner
      title={title}
      fullBg
      centerText={isClientDesktop}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      showStar3={false}
    />
  );
};

export default MediaBanner;