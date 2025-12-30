import HeroBanner from "../banners/HeroBanner";
import { InvestorBannerProps } from "@/app/types/investor-overview.type";

const InvestorBanner = ({ data }: InvestorBannerProps) => {
  const { title, sectionTitle, ctaButton, description, image, mobImage } = data;
  return (
    <div>
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
        fullBg
        useTargetBlank={ctaButton?.hasExternalLink === "true"}
        showStar2={false}
        showStar3={false}
      />
    </div>
  );
};

export default InvestorBanner;
