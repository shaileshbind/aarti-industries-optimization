import React from "react";
import { ShapedByProps } from "@/app/types/who-we-are.type";
import BlackInfoSection from "../sections/BlackInfoSection";

const ShapedBy: React.FC<ShapedByProps> = ({ data }) => {
  const { ctaButton, description, image, mobImage, title } = data;
  return (
    <BlackInfoSection
      image={image?.url}
      mobAlt={mobImage?.alternativeText}
      alt={image?.alternativeText}
      mobImage={mobImage?.url}
      title={title}
      description={description}
      ctaLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`}
      ctaTitle={ctaButton?.title}
    />
  );
};

export default ShapedBy;
