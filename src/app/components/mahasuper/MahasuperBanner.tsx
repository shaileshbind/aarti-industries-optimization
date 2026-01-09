import HeroBanner from "../banners/HeroBanner";
import { MahasuperBannerProps } from "@/app/types/mahasuper.type";

const MahasuperBanner = ({ data }: MahasuperBannerProps) => {
  const { title, image, mobImage, ctaLink, ctaTitle } = data;
  return (
    <HeroBanner
      leftDesc={true}
      title={title}
      btnTitle={ctaTitle}
      btnLink={ctaLink}
      fullBg
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
    />
  );
};

export default MahasuperBanner;
