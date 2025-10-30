import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { WhoBannerProps } from "@/app/types/who-we-are.type";

const WhoBanner: React.FC<WhoBannerProps> = ({ data }) => {
  const { title, description, image } = data;

  return (
    <HeroBanner tag={title} title={description} image={image?.url} fullBg />
  );
};

export default WhoBanner;
