import HeroBanner from "../banners/HeroBanner";
import { MediaBannerProps } from "@/app/types/media-kit.type";

const MediaBanner = ({ data }: MediaBannerProps) => {
  const { title, image, mobImage } = data;

  return (
    <HeroBanner
      title={title}
      fullBg
      centerText={true}
      image={image?.url}
      mobImage={mobImage?.url}
      alt={image?.alternativeText}
      mobAlt={mobImage?.alternativeText}
      showStar3={false}
      lineClassName="hidden md:block"
      bottomMiddleStarClassName="hidden md:block"
    />
  );
};

export default MediaBanner;
