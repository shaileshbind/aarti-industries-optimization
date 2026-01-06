import { BodyText2, H2 } from "../Typography2";
import Image from "next/image";
import clsxN from "../../../../utils/clsxN";
import clsx from "clsx";

type NumberCardProps = {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  desc?: string;
  className?: string;
  titleClassName?: string;
};

const NumberCard = ({
  imageSrc,
  imageAlt,
  desc,
  title,
  className,
  titleClassName,
}: NumberCardProps) => {
  return (
    <div
      className={clsxN(
        `bg-[#EFF3F5] md:py-[27px] py-5 px-5 md:px-[24px] rounded-[20px] overflow-hidden relative group h-auto lg:h-[204px] lgx:h-[174px]`,
        className
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt ? imageAlt : "img"}
          fill
          className="object-cover absolute object-top transition-all duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          {title && (
            <H2
              className={clsx(
                `text-orange-200 text-[40px] md:text-[44px]`,
                titleClassName
              )}
            >
              {title}
            </H2>
          )}
          {desc && (
            <BodyText2 className=" text-[14px] md:text-[18px] lg:text-[16px]">
              {desc}
            </BodyText2>
          )}
        </>
      )}
    </div>
  );
};

export default NumberCard;
