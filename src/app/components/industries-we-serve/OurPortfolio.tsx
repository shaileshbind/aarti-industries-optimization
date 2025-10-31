import React from "react";
import { H2 } from "../Typography2";
import TabsAutoplaySection from "../sections/TabsAutoplaySection";
import { FadeInRevealBlur } from "../ScrollReveal";
import { OurPortfolioProps } from "@/app/types/industries-we-serve.type";

const OurPortfolio: React.FC<OurPortfolioProps> = ({ data }) => {
  const { title, content } = data;

  return (
    <div className="my-[50px] lg:my-[100px]">
      {title && (
        <FadeInRevealBlur>
          <H2 className="mx-[20px] lg:mx-[60px]">{title}</H2>
        </FadeInRevealBlur>
      )}

      {content?.length > 0 && (
        <div className="mt-[50px]">
          <TabsAutoplaySection
            data={content}
            tabClass="!text-[16px]"
            starImgEffect
          />
        </div>
      )}
    </div>
  );
};

export default OurPortfolio;
