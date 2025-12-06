import React from "react";
import { BodyText1, H2, SubH2 } from "../Typography2";
import { FadeInReveal } from "../ScrollReveal";
import { OurResponsibilityProps } from "@/app/types/social-health-and-safety.type";

const OurResponsibility: React.FC<OurResponsibilityProps> = ({ data }) => {
  const { title, leftSection, rightSection } = data;

  return (
    <div className="pt-[70px] lg:pt-[100px]">
      <div className="max-w-[unset] lg:max-w-[1320px] px-[20px] lg:mx-auto">
        {title && (
          <FadeInReveal>
            <H2 className="lg:max-w-[650px] text-left mx-[unset]">
              {title}
            </H2>
          </FadeInReveal>
        )}
        <div className="mt-[28px] pl-[20px] lg:pl-[unset] lg:mt-[60px] grid lg:flex gap-y-[16px] gap-x-[100px] ml-[unset] lg:ml-[130px] max-w-[unset] lg:max-w-[1000px]">
          {leftSection && (
            <FadeInReveal>
              <SubH2 className="relative before:content-[''] before:absolute before:top-2 before:mr-2 before:right-full before:w-[14px] before:h-[14px] before:bg-[url('/images/star-orange.svg')] before:bg-no-repeat before:bg-center before:bg-contain"> {leftSection[0].title}</SubH2>
              <BodyText1 className="mt-4">{leftSection[0].description}</BodyText1>
            </FadeInReveal>
          )}

          {rightSection && (
            <FadeInReveal>
              <SubH2  className="relative before:content-[''] before:absolute before:top-2 before:mr-2 before:right-full before:w-[14px] before:h-[14px] before:bg-[url('/images/star-orange.svg')] before:bg-no-repeat before:bg-center before:bg-contain">{rightSection[0].title}</SubH2>
              <BodyText1 className="mt-4">{rightSection[0].description}</BodyText1>
            </FadeInReveal>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurResponsibility;
