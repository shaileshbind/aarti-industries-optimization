import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ImageProps } from "@/app/types/global.type";

export type FinancialBannerProps = {
  data: {
    title: string;
    description: string;
    image: ImageProps;
    mobImage: ImageProps;
  };
};

const FinancialBanner: React.FC<FinancialBannerProps> = ({ data }) => {
  const { title, description, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
      desc={description}
      fullBg
      // Was `leftDesc={isMobile} centerText={!isMobile}` driven by
      // useMatchMedia("(max-width:820px)"). That hook returns false during SSR,
      // so the server rendered the centered 360px variant and mobile clients
      // snapped to the 490px left-aligned variant after hydration - resizing the
      // hero image, which is this page's LCP element. `responsiveCenter` encodes
      // the same left-below-md / centered-above-md layout in CSS, so the first
      // paint is already correct for the viewport.
      responsiveCenter
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default FinancialBanner;
