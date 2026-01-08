"use client";
import HeroBanner from "../banners/HeroBanner";
import { BlogBannerProps } from "@/app/types/blogs.type";
import { useMediaQuery } from "@mui/material";

const BlogBanner = ({ data }: BlogBannerProps) => {
  const isMobile = useMediaQuery("(max-width:820px)");
  const { title, image, mobImage } = data;

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

export default BlogBanner;
