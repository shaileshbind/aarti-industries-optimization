import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { CPBannerProps } from "@/app/types/code-and-policies.type";

const CodePolicyBanner = ({ data }: CPBannerProps) => {
  const { title, description, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
      desc={description}
      fullBg
      centerText={true}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default CodePolicyBanner;
