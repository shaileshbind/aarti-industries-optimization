import React from "react";
import { BodyText1, H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import { FadeInReveal } from "../ScrollReveal";
import { EnvInfoProps } from "@/app/types/environment.type";

const EnvInfo = ({ data }: EnvInfoProps) => {
  const { heading, leftText, righText } = data;
  return (
    <div className="pt-[70px] lg:pt-[100px]">
      <div className="max-w-[unset] lg:max-w-[1000px] mx-[20px] lg:mx-auto">
        <AnimatedText>
          <H3 className="max-w-[unset] xl:max-w-[1000px] text-left xl:text-center mx-[unset] lg:mx-auto">
            {heading}
          </H3>
        </AnimatedText>
        <div className="mt-[28px] lg:mt-[60px] grid xl:flex gap-y-[16px] gap-x-[100px] ml-[unset] xl:ml-[130px] max-w-[unset] lg:max-w-[1000px]">
          <FadeInReveal>
            <BodyText1>{leftText}</BodyText1>
          </FadeInReveal>
          <FadeInReveal>
            <BodyText1>{righText}</BodyText1>
          </FadeInReveal>
        </div>
      </div>
    </div>
  );
};

export default EnvInfo;
