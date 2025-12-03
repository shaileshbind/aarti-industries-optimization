import React from "react";
import TabsAutoplaySection from "../sections/TabsAutoplaySection";
import { OurPortfolioProps } from "@/app/types/industries-we-serve.type";

const OurPortfolio: React.FC<OurPortfolioProps> = ({ data }) => {
  const { title, content } = data;

  return (
    <div className="mb-[22px] lg:mb-[140px]">
      {content?.length > 0 && (
        <div>
          <TabsAutoplaySection
            data={content}
            tabClass="!text-[16px]"
            starImgEffect
            title={title}
          />
        </div>
      )}
    </div>
  );
};

export default OurPortfolio;
