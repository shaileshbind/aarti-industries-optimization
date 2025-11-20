import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { ShareHolderBannerProps } from "@/app/types/shareholder.type";

const ShareHolderBanner: React.FC<ShareHolderBannerProps> = ({ data }) => {
  const { title, description, image, mobImage } = data;

  return (
    <HeroBanner
      title={"Shareholders Information"}
      desc={
        "We deliver sustainable chemical solutions that power innovation across global industries."
      }
      fullBg
      centerText={true}
      image={"/images/sustainability/sus-banner.png"}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default ShareHolderBanner;
