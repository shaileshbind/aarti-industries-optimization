import React from "react";
import BlackInfoSection from "../sections/BlackInfoSection";
import { MiddleBannerProps } from "@/app/types/digital-transformation.type";

const MiddleBanner = ({ data }: MiddleBannerProps) => {
  const { image, mobImage, title, description } = data;

  return (
    <div className="mb-[72px] lg:mb-[30px] xl:mb-[100px]">
      <BlackInfoSection
        image={image?.url}
        mobAlt={mobImage?.alternativeText}
        alt={image?.alternativeText}
        mobImage={mobImage?.url}
        title={title}
        description={description}
      />
    </div>
  );
};

export default MiddleBanner;
