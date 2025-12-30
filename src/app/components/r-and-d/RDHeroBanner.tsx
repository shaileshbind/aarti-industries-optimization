"use client";
import { useEffect, useState } from "react";
import HeroBanner from "../banners/HeroBanner";
import { RDHeroBannerProps } from "@/app/types/r-and-d.type";
import { isMobile } from "react-device-detect";

const RDHeroBanner: React.FC<RDHeroBannerProps> = ({ data }) => {
   const [isClientMobile, setIsClientMobile] = useState(false);
    useEffect(() => {
      setIsClientMobile(isMobile);
    }, []);
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

export default RDHeroBanner;
