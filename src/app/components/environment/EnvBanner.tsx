import HeroBanner from "../banners/HeroBanner";
import { EnvBannerProps } from "@/app/types/environment.type";

const EnvBanner = ({ data }: EnvBannerProps) => {
  const { title, sectionTitle, image, mobImage } = data;
  return (
    <div>
      <HeroBanner
        fullBg
        tag={sectionTitle}
        title={title}
        image={image?.url}
        mobImage={mobImage?.url}
        alt={image?.alternativeText}
        mobAlt={mobImage?.alternativeText}
      />
    </div>
  );
};

export default EnvBanner;
