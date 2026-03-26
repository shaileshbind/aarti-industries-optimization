"use client";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";
import HeroBanner from "../banners/HeroBanner";
import { MediaBannerProps } from "@/app/types/media-kit.type";

const MediaBanner = ({ data }: MediaBannerProps) => {
  const { title, image, mobImage } = data;
  const isMobile = useMatchMedia("(max-width:820px)");

  return (
    <HeroBanner
      title={title}
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

export default MediaBanner;
