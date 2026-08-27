import HeroBanner from "../banners/HeroBanner";
import { MahasuperBannerProps } from "@/app/types/mahasuper.type";

const MahasuperBanner = ({ data }: MahasuperBannerProps) => {
  const { title, image, mobImage, ctaButton, formTitle } = data;
  return (
    <HeroBanner
      leftDesc={true}
      title={title}
      secondaryBtnLeftTitle={ctaButton?.title}
      secondaryBtnLeftLink={
        ctaButton?.hasExternalLink === "true"
          ? ctaButton?.externalLink
          : ctaButton?.link?.link
      }
      useTargetBlank={ctaButton?.hasExternalLink === "true"}
      secondaryBtnFormTitle={formTitle}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default MahasuperBanner;
