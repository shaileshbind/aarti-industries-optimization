import Image from "next/image";
import React from "react";
import { H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";

export default function WhatSets() {
  return (
    <div className="relative lg:h-[calc(100vh-70px)] ">
      {/* Desktop */}
      <div className="lg:absolute w-full h-full hidden lg:block">
        <Image
          src={"/images/environment/strong-banner.png"}
          alt={"banner"}
          width={1440}
          height={720}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-[1] fluid-container lg:py-10 lg:px-8 xl:px-[60px] flex flex-col justify-between h-full">
        <div>
          <H2 className="max-w-[560px] text-[#002F50] lg:text-[#FFF]">
            What Sets Aarti Industries Apart in Speciality Manufacturing
          </H2>

          <Button title="Know Our Chemistry Strength" className="mt-6" />

          {/* Mobile */}
          <div className="w-full h-[250px] md:h-[420px] block lg:hidden rounded-[20px] overflow-hidden mt-[34px] mb-4">
            <Image
              src={"/images/environment/strong-banner.png"}
              alt={"banner"}
              width={1440}
              height={720}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)]?.map((_, index) => (
            <FadeInReveal
              delay={index * 0.2}
              className="bg-[#EFF3F5] lg:bg-[#FFF] p-4 xl:p-8 flex flex-col gap-6 justify-between md:h-[232px] rounded-[20px]"
            >
              <Image
                src={"/images/star-orange.svg"}
                alt={"banner"}
                width={40}
                height={40}
              />

              <p className="text-[#4C5861]">
                Data-driven operations; repeatability that audit teams trust
              </p>
            </FadeInReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
