'use client'
import { useEffect, useState } from "react";
import HeroBanner from "../banners/HeroBanner";
import { BlogBannerProps } from "@/app/types/blogs.type";
import { isMobile } from "react-device-detect";

const BlogBanner = ({ data }: BlogBannerProps) => {
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

export default BlogBanner;
