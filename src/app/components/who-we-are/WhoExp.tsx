import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { WhoExpProps } from "@/app/types/who-we-are.type";

const WhoExp: React.FC<WhoExpProps> = ({ data }) => {
  const { ExlporeCard } = data;
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title={ExlporeCard?.[0]?.title}
          items={ExlporeCard?.[0]?.ctaButton}
        />

        <ExploreCard
          lightVariant
          title={ExlporeCard?.[1]?.title}
          items={ExlporeCard?.[1]?.ctaButton}
        />
      </div>
    </div>
  );
};

export default WhoExp;
