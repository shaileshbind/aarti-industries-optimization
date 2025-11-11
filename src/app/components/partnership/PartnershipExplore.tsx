import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { PartneshipExploreProps } from "@/app/types/partnership.type";

const PartneshipExplore: React.FC<PartneshipExploreProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title={data?.[0]?.exploreMore?.title}
          items={data?.[0]?.exploreMore?.ctaButton}
        />

        <ExploreCard
          lightVariant
          title={data?.[1]?.exploreMore?.title}
          items={data?.[1]?.exploreMore?.ctaButton}
        />
      </div>
    </div>
  );
};

export default PartneshipExplore;
