import React from "react";
import { BodyText1, H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import { FadeInReveal } from "../ScrollReveal";
import { WhoInfoProps } from "@/app/types/who-we-are.type";

const WhoInfo: React.FC<WhoInfoProps> = ({ data }) => {
  const { description, leftSection, righSection } = data;

  return (
    <div className="pt-[70px] lg:pt-[100px]">
      <div className="max-w-[unset] lg:max-w-[1000px] mx-[20px] lg:mx-auto">
        {description && (
          <AnimatedText>
            <H3 className="max-w-[unset] lg:max-w-[1000px] text-left mx-[unset] lg:mx-auto text-[#002F50]">
              {description}
            </H3>
          </AnimatedText>
        )}
        <div className="mt-[28px] lg:mt-[60px] grid lg:flex gap-y-[16px] gap-x-[100px] ml-[unset] lg:ml-[130px] max-w-[unset] lg:max-w-[1000px]">
          {leftSection && (
            <FadeInReveal>
              <BodyText1>{leftSection}</BodyText1>
            </FadeInReveal>
          )}

          {righSection && (
            <FadeInReveal>
              <BodyText1>{righSection}</BodyText1>
            </FadeInReveal>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoInfo;
