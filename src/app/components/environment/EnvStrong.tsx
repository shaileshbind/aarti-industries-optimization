import React from "react";
import BlackInfoSection from "../sections/BlackInfoSection";
import { EnvStrongProps } from "@/app/types/environment.type";

const EnvStrong = ({ data }: EnvStrongProps) => {
  const { image, mobImage, title, ctaButton, description } = data;
  return (
    <div className="my-[50px] lg:my-[100px]">
      <BlackInfoSection
        image={image?.url}
        mobAlt={mobImage?.alternativeText}
        alt={image?.alternativeText}
        mobImage={mobImage?.url}
        title={title}
        description={description}
        ctaLink={ctaButton?.link}
        ctaTitle={ctaButton?.title}
      />
    </div>
  );
};

export default EnvStrong;
