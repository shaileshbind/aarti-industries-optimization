import React from "react";
import HeroBanner from "../banners/HeroBanner";
import { CodeAndPoliciesBannerProps } from "../../types/code-and-policies.type";

const CodeAndPoliciesBanner: React.FC<CodeAndPoliciesBannerProps> = ({ data }) => {
  const { title, description, image,mobImage } = data;

  return (
    // <Banner
    //     data={{ title, description, image: image as BannerImage,mobImage: mobImage as BannerImage }}
         
    //   />
    <HeroBanner
      // tag={title}
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

export default CodeAndPoliciesBanner;
