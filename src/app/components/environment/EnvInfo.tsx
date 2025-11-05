import React from "react";
import { BodyText1, H3 } from "../Typography2";
import AnimatedText from "../AnimatedText";
import { FadeInReveal } from "../ScrollReveal";

const EnvInfo = () => {
  return (
    <div className="pt-[70px] lg:pt-[100px]">
      <div className="max-w-[unset] lg:max-w-[1000px] mx-[20px] lg:mx-auto">
        <AnimatedText>
          <H3 className="max-w-[unset] lg:max-w-[1000px] text-left lg:text-center mx-[unset] lg:mx-auto">
            At Aarti Industries Limited AIL, sustainability is built into
            everything we do; from product design to operations. We drive a
            low-carbon, circular economy through efficient resource utilisation,
            waste reduction, energy management, and proactive regulatory
            compliance.
          </H3>
        </AnimatedText>
        <div className="mt-[28px] lg:mt-[60px] grid lg:flex gap-y-[16px] gap-x-[100px] ml-[unset] lg:ml-[130px] max-w-[unset] lg:max-w-[1000px]">
          <FadeInReveal>
            <BodyText1>
              By embedding environmental risks into our Enterprise Risk
              Management (ERM) framework and upholding stringent ESG standards,
              we ensure resilience and responsibility across our value chain. We
              uphold the highest ESG standards and work closely with our
              partners to create a resilient ecosystem that ensures business
              continuity while advancing environmental stewardship.
            </BodyText1>
          </FadeInReveal>
          <FadeInReveal>
            <BodyText1>
              This reflects our commitment to leading the way in sustainable
              chemical manufacturing.We prioritise high ESG standards,
              partnering to build a resilient ecosystem that ensures business
              continuity and environmental stewardship, reflecting our
              commitment to sustainable chemical manufacturing leadership.
            </BodyText1>
          </FadeInReveal>
        </div>
      </div>
    </div>
  );
};

export default EnvInfo;
