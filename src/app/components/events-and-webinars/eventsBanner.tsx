'use client'
import HeroBanner from "../banners/HeroBanner";
import { EventsBannerProps } from "../../types/events-and-webinars.type";   
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

const EventsBanner = ({ data }: EventsBannerProps) => {
  const [isClientMobile, setIsClientMobile] = useState(false);
    useEffect(() => {
      setIsClientMobile(isMobile);
    }, []);
  const { title, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
      fullBg
      centerText={!isClientMobile}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default EventsBanner;
