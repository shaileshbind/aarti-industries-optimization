import React from "react";
import Image from "next/image";
import { Cta, SubH2 } from "../Typography2";
import Link from "next/link";

type ExploreCardProps = {
  title?: string;
  items?: {
    id?: number;
    ctaTitle?: string;
    ctaLink?: string;
  }[];
  lightVariant?: boolean;
};

const ExploreCard = ({ title, items, lightVariant }: ExploreCardProps) => {
  return (
    <div
      className={`relative w-full min-h-[100px] lg:min-h-[unset] rounded-[16px] lg:rounded-[20px] py-5 px-6 lg:py-7 lg:px-9 overflow-hidden ${
        lightVariant ? "bg-orange-300" : "bg-orange-200"
      } `}
    >
      <Image
        src="/images/home/flower-t.svg"
        alt="img"
        width={151}
        height={151}
        className="absolute bottom-[35px] md:bottom-[40px] -right-[18px] md:-right-[30px] w-[93px] h-[93px] md:w-[151px] md:h-[151px]"
      />
      <SubH2 className="text-white">{title}</SubH2>
      <div className="mt-[10px] lg:mt-[22px] flex gap-x-[12px]">
        {items?.map((item) => {
          if (!item?.ctaLink) return null;
          return (
            <div key={item?.id} className="flex gap-x-[12px] items-center">
              {item?.ctaTitle && (
                <Cta className="hidden lg:block bg-transparent text-white">
                  {item?.ctaTitle}
                </Cta>
              )}
              {item?.ctaLink && item?.ctaTitle && (
                <Link
                  href={item?.ctaLink}
                  target="_blank"
                  className="block lg:hidden"
                >
                  <Cta className="bg-transparent text-white underline underline-offset-[1px] [text-underline-position:under]">
                    {item?.ctaTitle}
                  </Cta>
                </Link>
              )}
              {item?.ctaLink && (
                <Link
                  href={item?.ctaLink}
                  target="_blank"
                  className="hidden lg:block"
                >
                  <Image
                    src="/images/arrow-white-top-r.svg"
                    alt="icon"
                    width={30}
                    height={30}
                  />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreCard;
