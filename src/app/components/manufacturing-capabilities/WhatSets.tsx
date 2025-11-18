import Image from "next/image";
import React from "react";
import { H2 } from "../Typography2";
import Button from "../Button";
import { FadeInReveal } from "../ScrollReveal";

export default function WhatSets() {
  return (
    <div className="relative h-[calc(100vh-70px)]">
      <div className="absolute w-full h-full">
        <Image
          src={"/images/environment/strong-banner.png"}
          alt={"banner"}
          width={1440}
          height={720}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-[1] fluid-container py-[80px] px-[60px] flex flex-col justify-between h-full">
        <div>
          <H2 className="max-w-[560px] text-[#FFF]">
            What Sets Aarti Industries Apart in Speciality Manufacturing
          </H2>

          <Button title="Know Our Chemistry Strength" className="mt-6" />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)]?.map((item, index) => (
            <FadeInReveal
              delay={index * 0.2}
              className="bg-[#FFF] p-8 flex flex-col justify-between h-[232px] rounded-[20px]"
            >
              <Image
                src={"/images/star-orange.svg"}
                alt={"banner"}
                width={40}
                height={40}
              />

              <p>
                Data-driven operations; repeatability that audit teams trust
              </p>
            </FadeInReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
