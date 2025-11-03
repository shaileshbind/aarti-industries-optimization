import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { RDHeroBannerProps } from "@/app/types/r-and-d.type";

const RDHeroBanner: React.FC<RDHeroBannerProps> = ({ data }) => {
  const { title, pageHeading, ctaButton, description, image, mobImage } = data;

  return (
    <HeroBanner
      tag={pageHeading}
      title={title}
      desc={description}
      btnLink={ctaButton?.link || "#"}
      btnTitle={ctaButton?.title}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default RDHeroBanner;
