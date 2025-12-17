import HeroBanner from "../banners/HeroBanner";
import { CampusBannerProps } from "@/app/types/campus.type";

const CampusBanner = ({ data }: CampusBannerProps) => {
  const { title, sectionTitle, ctaButton, description, image, mobImage } = data;

  return (
    <HeroBanner
      tag={sectionTitle}
      title={title}
      desc={description}
      btnLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`} 
      btnTitle={ctaButton?.title}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      useTargetBlank={ctaButton?.hasExternalLink === "true"}
    />
  );
};

export default CampusBanner;
