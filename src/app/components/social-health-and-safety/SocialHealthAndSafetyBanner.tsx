import HeroBanner from "../banners/HeroBanner";
import { SocialHealthAndSafetyBannerProps } from "@/app/types/social-health-and-safety.type";

const SocialHealthAndSafetyBanner = ({
  data,
}: SocialHealthAndSafetyBannerProps) => {
  const { title, tag, image, mobImage, ctaButton } = data;
  return (
    <HeroBanner
      tag={tag}
      leftDesc={true}
      title={title}
      btnTitle={ctaButton?.title}
      btnLink={`${ctaButton?.hasExternalLink == "true" ? ctaButton?.externalLink : ctaButton?.link?.link}`}
      useTargetBlank={ctaButton?.hasExternalLink === "true"}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default SocialHealthAndSafetyBanner;
