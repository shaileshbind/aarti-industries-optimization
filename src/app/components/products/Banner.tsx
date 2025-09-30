import React from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import { H2 } from "../Typography2";
import { BodyText1 } from "../Typography2";

function Banner() {
  return (
    <div className="relative overflow-hidden w-full h-[360px] md:h-[440px] flex items-center justify-center flex-col text-center py-8">
      <div className="h-auto max-w-[65%] md:max-w-[30%] mt-20 z-10">
        <H2 className="text-h2-l">Products</H2>
        <BodyText1 className="text-body-m mt-2.5 mb-9">
          We deliver sustainable chemical solutions that power innovation across
          global industries.
        </BodyText1>
      </div>
      <SearchBar />
      <div className="absolute top-0 h-full w-full z-0">
        <Image
          src="/images/products/product-banner-image.png"
          alt="banner"
          width={600}
          height={400}
          className="h-full w-full object-cover md:block hidden"
        />
        <Image
          src="/images/products/product-banner-image-mobile.png"
          alt="banner"
          width={600}
          height={400}
          className="h-full w-full object-cover md:hidden block"
        />
      </div>
      {/* stars + lines */}
      <div className="hidden lg:block absolute h-full bg-white w-[1px] top-0 right-[88px] lg:right-[212.5px] z-5" />
      <div className="hidden lg:block  absolute bottom-[84px] right-[68px] lg:right-[177px] w-[42px] lg:w-[72px] z-5 ">
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
}

export default Banner;