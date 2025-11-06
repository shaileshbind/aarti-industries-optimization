import React from "react";
import Image from "next/image";
import { Cta, SubH2 } from "../Typography2";
import Link from "next/link";

type ExploreCardProps = {
  title?: string;
  items?: {
    id?: number;
    title?: string;
    link?: string;
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
      {items && items?.length > 0 && (
        <div className="mt-[10px] lg:mt-[22px] flex gap-x-[12px]">
          {items?.map((item) => {
            if (!item?.link) return null;
            return (
              <Link
                href={item?.link || "#"}
                target="_blank"
                key={item?.id}
                className="flex gap-x-[12px] items-center cursor-pointer"
              >
                {item?.title && (
                  <Cta className="bg-transparent text-white text-[14px] lg:text-[16px]">{item?.title}</Cta>
                )}

                <Image
                  src="/images/arrow-white-top-r.svg"
                  alt="icon"
                  width={30}
                  height={30}
                  className="hidden lg:block"
                />
                <Image
                  src="/images/arrow-white-top-r.svg"
                  alt="icon"
                  width={24}
                  height={24}
                  className="block lg:hidden"
                />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ExploreCard;
