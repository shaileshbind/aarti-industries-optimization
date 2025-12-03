import React from "react";
import Image from "next/image";
import Link from "next/link";

type DateCardProps = {
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  desc?: string;
  animate?: boolean;
  useTargetBlank?: boolean;
};

const DateCard = ({
  link,
  imageAlt,
  imageSrc,
  date,
  desc,
  animate,
  useTargetBlank = true,
}: DateCardProps) => {
  const CardContent = () => (
    <>
      {animate ? (
        <div className="group relative inverted-radius transition-all duration-300">
          <div className="relative group-hover:rounded-[20px] transition-all duration-300 rounded-[10px] w-full h-[190px] lg:h-[230px] overflow-hidden z-[2]">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt ? imageAlt : "img"}
                fill
                className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
              />
            )}
          </div>
          <div className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
            {date}
          </div>
          <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
            {desc}
          </div>
        </div>
      ) : (
        <div className="group relative transition-all duration-300">
          <div className="relative  transition-all duration-300 rounded-[10px] w-full h-[230px] overflow-hidden z-[2]">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={imageAlt ? imageAlt : "img"}
                fill
                className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-[1.1]"
              />
            )}
          </div>
          <div className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
            {date}
          </div>
          <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
            {desc}
          </div>
        </div>
      )}
    </>
  );

  return link ? (
    <Link
      href={link}
      target={useTargetBlank ? "_blank" : "_self"}
      className="block cursor-pointer"
    >
      {animate && (
        <div className="absolute right-3 top-2 z-[2] w-12 h-12 grid place-items-center transition-all duration-500">
          <Image
            src={"/images/arrow-up-right-o.svg"}
            alt={"arrow"}
            width={24}
            height={24}
          />
        </div>
      )}
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

export default DateCard;
