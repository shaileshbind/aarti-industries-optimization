'use client'
import { useEffect, useState } from "react";
import HeroBanner from "../banners/HeroBanner";
import { AnnualRBannerProps } from "@/app/types/annual-reports.type";
import { isMobile } from "react-device-detect";
const AnnualRBanner = ({ data }: AnnualRBannerProps) => {
  const [isClientMobile, setIsClientMobile] = useState(false);
    useEffect(() => {
      setIsClientMobile(isMobile);
    }, []);
  const { title, description, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
      desc={description}
      fullBg
      centerText={!isClientMobile}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      centerTitleClassName="lg:max-w-[900px]"
    />
  );
};

export default AnnualRBanner;
