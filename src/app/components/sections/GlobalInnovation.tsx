"use client";
import React from "react";
import AnimatedText from "../AnimatedText";
import { BodyText1, H2, SubH2 } from "../Typography2";
import Image from "next/image";
import { GlobalInnovationProps } from "@/app/types/our.story.type";

const GlobalInnovation: React.FC<GlobalInnovationProps> = ({ data }) => {
  const { title,  focusSectionTitle, focus_item, image } = data;

  const displayImage = image?.url || "/images/cdmo/cdmo-driving-banner.png";
  const displayAlt = image?.alternativeText || "innovation-banner";

  return (
    <section className="fluid-container flex flex-col justify-between my-[60px] lg:my-[120px]">
      {/* Animated Heading */}
      <AnimatedText className="lg:w-[60%] w-full lg:mb-16 mb-6">
        <H2>{title}</H2>
      </AnimatedText>

      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Image Section */}
        <div className="relative h-[317px] lg:h-[600px] w-full overflow-hidden lg:w-[55%]">
          <div className="absolute right-0 top-0 min-h-[317px] lg:min-h-[600px] w-[100%] lg:w-full rounded-[20px]">
            <Image
              src={displayImage}
              alt={displayAlt}
              fill
              className="absolute object-cover rounded-[20px]"
            />

            {/* Decorative overlays */}
            <div className="absolute left-0 object-cover backdrop-blur-lg rounded-tl-[20px] lg:rounded-tl-[20px] h-[calc(100%-40px)] lg:h-[calc(100%-93px)] w-[71px] lg:w-[155px]" />
            <div className="absolute bottom-0 right-0 object-cover backdrop-blur-lg lg:!rounded-[20px] lg:!rounded-tl-[0px] rounded-b-[20px] h-[calc(100%-278px)] lg:h-[calc(100%-505px)] w-full" />

            <Image
              src="/images/home/star-white.svg"
              alt="star-icon"
              width={72}
              height={72}
              className="absolute bottom-[20px] lg:bottom-[57px] z-10 left-[50px] lg:left-[120px] w-[42px] lg:w-[72px]"
            />
            <div className="absolute min-h-screen bg-white w-[1px] left-[71px] lg:left-[155px]" />
            <div className="absolute w-full bg-white bottom-[40px] lg:bottom-[92.5px] h-[1px]" />
          </div>
        </div>

        {/* Focus Items */}
        <div className="lg:w-[40%] w-full flex flex-col gap-4 lg:gap-8 mt-[30px] lg:mt-0">
          {focusSectionTitle && (
            <SubH2 className="lg:mb-6 mb-4">{focusSectionTitle}</SubH2>
          )}

          {focus_item.map((item, index) => (
            <div
              key={item.id}
              className={`
                flex gap-6 lg:gap-[53px] 
                ${index !== focus_item.length - 1 ? "border-b border-b-[#E6EBEE] lg:pb-8 pb-4" : ""}
              `}
            >
              <BodyText1 className="text-[#DC4C03]">
                {item.order.padStart(2, "0")}
              </BodyText1>
              <BodyText1 className="lg:w-[60%]">{item.description}</BodyText1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalInnovation;
