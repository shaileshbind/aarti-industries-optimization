import React from "react";
import Image from "next/image";
import Link from "next/link";

type DateCardProps = {
  link?: string;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  desc?: string;
};

const DateCard = ({ link, imageAlt, imageSrc, date, desc }: DateCardProps) => {
  const CardContent = () => (
    <>
      <div className="relative rounded-[10px] w-full h-[230px] overflow-hidden group">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt ? imageAlt : "img"}
            fill
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-[16px] font-roboto text-[14px] leading-[140%] font-normal text-orange-200">
        {date}
      </div>
      <div className="mt-[8px] font-roboto text-[16px] leading-[156%] font-normal text-grey-400">
        {desc}
      </div>
    </>
  );

  return link ? (
    <Link href={link} target="_blank" className="block cursor-pointer">
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

export default DateCard;
