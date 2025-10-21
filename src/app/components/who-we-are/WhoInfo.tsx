import React from "react";
import { BodyText1, H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import { FadeInReveal } from "../ScrollReveal";

const WhoInfo = () => {
  return (
    <div className="pt-[70px] lg:pt-[100px]">
      <div className="max-w-[unset] lg:max-w-[1000px] mx-[20px] lg:mx-auto">
        <AnimatedText>
          <H3 className="max-w-[unset] lg:max-w-[1000px] text-left lg:text-center mx-[unset] lg:mx-auto">
            Aarti Industries Limited (AIL) is a global leader in speciality
            chemicals, combining world-class process chemistry and scale-up
            engineering with a strong commitment to sustainability and
            people-centric values.
          </H3>
        </AnimatedText>
        <div className="mt-[28px] lg:mt-[60px] grid lg:flex gap-y-[16px] gap-x-[100px] ml-[unset] lg:ml-[130px] max-w-[unset] lg:max-w-[1000px]">
          <FadeInReveal>
            <BodyText1>

              Since 1984, we have grown from an Indian-origin company serving
              global markets to a global manufacturer based in India, driven by
              innovation, environmental responsibility, and a culture that values
              our employees as our greatest asset.

            </BodyText1>
          </FadeInReveal>

          <FadeInReveal>
            <BodyText1>
              Operating 16 advanced manufacturing sites and offering over 100
              products, AIL ranks among the top global players for 75% of its
              portfolio. We serve customers spread across the globe, spanning
              industries such as agrochemicals, pharmaceuticals, polymers,
              pigments, dyes, fuel additives, battery materials, electronic
              chemicals, sunrise sectors and more.
            </BodyText1>
          </FadeInReveal>
        </div>
      </div>
    </div>
  );
};

export default WhoInfo;
