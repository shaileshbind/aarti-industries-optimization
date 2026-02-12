"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeroBanner from "../banners/HeroBanner";
import { NewsBannerProps } from "@/app/types/news.type";

const NewsBanner = ({ data }: NewsBannerProps) => {
  const { title, image, mobImage } = data;
  const isMobile = useMediaQuery("(max-width:820px)");

  return (
    <div>
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
    </div>
  );
};

export default NewsBanner;
