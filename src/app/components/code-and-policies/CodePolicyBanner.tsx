"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeroBanner from "../banners/HeroBanner";
import { CPBannerProps } from "@/app/types/code-and-policies.type";

const CodePolicyBanner = ({ data }: CPBannerProps) => {
  const { title, description, image, mobImage } = data;
  const isMobile = useMediaQuery("(max-width:820px)");

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
    />
  );
};

export default CodePolicyBanner;
