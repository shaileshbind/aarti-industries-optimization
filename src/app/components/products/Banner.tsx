"use client";

import React from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { H2, BodyText1 } from "../Typography2";
import { BannerProps } from "@/app/types/product.listing.type";

const Banner: React.FC<
  BannerProps & { onSearch: (q: string) => void; clearTrigger: number }
> = ({
  data,
  onSearch,
  setActiveTab,
  clearTrigger, // Add this prop
}) => {
  const { title, description, image, mobImage } = data;

  return (
    <div className="relative overflow-hidden w-full h-[360px] md:h-[440px] flex items-center justify-center flex-col text-center py-8">
      {/* Text Content */}
      <div className="h-auto max-w-[65%] md:max-w-[30%] mt-20 z-10">
        <H2 className="text-h2-l text-blue-100">{title}</H2>
        <BodyText1 className="text-body-m mt-2.5 mb-9 text-[#646464]">{description}</BodyText1>
      </div>

      {/* Search */}
      <SearchBar
        onSearch={onSearch}
        setActiveTab={setActiveTab}
        clearTrigger={clearTrigger}
      />

      {/* Background Images */}
      <div className="absolute top-0 h-full w-full z-0">
        <Image
          src={image?.url || "/images/products/product-banner-image.png"}
          alt={image?.alternativeText || "banner"}
          width={image?.width || 1000}
          height={image?.height || 306}
          className="h-full w-full object-cover md:block hidden"
        />
        <Image
          src={
            mobImage?.url || "/images/products/product-banner-image-mobile.png"
          }
          alt={mobImage?.alternativeText || "banner-mobile"}
          width={mobImage?.width || 1000}
          height={mobImage?.height || 306}
          className="h-full w-full object-cover md:hidden block"
        />
      </div>

      {/* Decorative Elements */}
      <div className="hidden lg:block absolute h-full bg-white w-[1px] top-0 right-[88px] lg:right-[212.5px] z-5" />
      <div className="hidden lg:block absolute bottom-[84px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-5 ">
        <Image
          src="/images/home/star-white.svg"
          alt="star"
          width={72}
          height={72}
        />
      </div>
      <div className="absolute bottom-[-22px] lg:bottom-[-36px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-5 ">
        <Image
          src="/images/home/star-white.svg"
          alt="img"
          width={72}
          height={72}
        />
      </div>
      <div className="block lg:hidden absolute bottom-[-22px] lg:bottom-[-36px] right-[-21px] lg:right-[-36px] w-[42px] lg:w-[72px] z-5">
        <Image
          src="/images/home/star-white.svg"
          alt="img"
          width={72}
          height={72}
        />
      </div>
    </div>
  );
};

export default Banner;
