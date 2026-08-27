"use client";
import HeroBanner from "../banners/HeroBanner";
import { LAABannerProps } from "@/app/types/life-at-aarti.type";
import { useMatchMedia } from "@/app/hooks/useMatchMedia";

const LifeAtBanner = ({ data }: LAABannerProps) => {
  const isClientMobile = useMatchMedia("(pointer: coarse)");
  const { sectionTitle, title, image, mobImage, ctaButton, description } = data;
  return (
    <div>
      <HeroBanner
        tag={sectionTitle}
        title={title}
        desc={description}
        btnTitle={ctaButton?.title}
        btnLink={`${
          ctaButton?.hasExternalLink == "true"
            ? ctaButton?.externalLink
            : ctaButton?.link?.link
        }`}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
        useTargetBlank={ctaButton?.hasExternalLink === "true"}
        showStar3={!isClientMobile}
      />
    </div>
  );
};

export default LifeAtBanner;
