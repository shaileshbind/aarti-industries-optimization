import HeroBanner from "../banners/HeroBanner";
import { LAABannerProps } from "@/app/types/life-at-aarti.type";

const LifeAtBanner = ({ data }: LAABannerProps) => {
  const { sectionTitle, title, image, mobImage, ctaButton, description } =
    data;
  return (
    <div>
      <HeroBanner
        tag={sectionTitle}
        title={title}
        desc={description}
        btnTitle={ctaButton?.title}
        btnLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`} 
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
        useTargetBlank={ctaButton?.hasExternalLink === "true"}
      />
    </div>
  );
};

export default LifeAtBanner;
