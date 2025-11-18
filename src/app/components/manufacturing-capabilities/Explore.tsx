import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { ExploreProps } from "@/app/types/manufacturing-capabilities.type";

const Explore: React.FC<ExploreProps> = ({ data }) => {
  const { ExlporeCard } = data;
  return (
    <div className="py-[50px] md:py-[100px] container">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
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

export default Explore;
