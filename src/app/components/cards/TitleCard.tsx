import { SubH2 } from "../Typography2";
import Image from "next/image";

type TitleCardProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
};

const TitleCard = ({ imageAlt, imageSrc, title }: TitleCardProps) => {
  return (
    <div className="relative rounded-[20px] w-full h-[280px] sm:h-[320px] lg:h-[355px] bg-[#EFF3F5] mr-5 lg:mr-0 overflow-hidden">
      {title && (
        <SubH2 className="text-blue-200 py-[24px] px-[26px]">{title}</SubH2>
      )}
      <div className="absolute bottom-0 w-full h-[200px] sm:h-[240px] lg:h-[272px] overflow-hidden rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt ? imageAlt : "img"}
            fill
            className="rounded-b-[20px] object-cover object-top transition-transform duration-[500ms] ease-in-out hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
    </div>
  );
};

export default TitleCard;
