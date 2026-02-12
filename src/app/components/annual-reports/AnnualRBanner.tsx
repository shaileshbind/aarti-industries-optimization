"use client";
import HeroBanner from "../banners/HeroBanner";
import { AnnualRBannerProps } from "@/app/types/annual-reports.type";
import useMediaQuery from "@mui/material/useMediaQuery";

const AnnualRBanner = ({ data }: AnnualRBannerProps) => {
  const isMobile = useMediaQuery("(max-width:820px)");
  const { title, description, image, mobImage } = data;

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
      centerTitleClassName="lg:max-w-[900px]"
    />
  );
};

export default AnnualRBanner;
