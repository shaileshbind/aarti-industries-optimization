import clsxN from "../../../../utils/clsxN";
import { BodyText2, SubH2 } from "../Typography2";
import Image from "next/image";

type TitleCardProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  className?: string;
  imageClassName?: string;
};

const TitleCard = ({
  imageAlt,
  imageSrc,
  title,
  description,
  className,
  imageClassName,
}: TitleCardProps) => {
  return (
    <div
      className={clsxN(
        "relative rounded-[20px] w-full   bg-[#EFF3F5] mr-5 lg:mr-0 overflow-hidden flex flex-col",
        className,
      )}
    >
      <div className="flex flex-col gap-2 py-[24px] px-[26px] min-h-[175px]">
        {title && <SubH2 className="text-blue-200 ">{title}</SubH2>}
        {description && (
          <BodyText2 className="text-grey-400">{description}</BodyText2>
        )}
      </div>
      <div
        className={clsxN(
          "relative bottom-0 w-full aspect-[312/180] rounded-tl-[20px] rounded-tr-[20px] overflow-hidden mt-auto",
          imageClassName,
        )}
      >
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
