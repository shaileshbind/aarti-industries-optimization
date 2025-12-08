import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { AdvExploreProps } from "@/app/types/aarti-advantage.type";

const AdvExplore: React.FC<AdvExploreProps> = ({ data }) => {
  return (
    <div className="py-[50px] md:py-[100px] container">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
        <ExploreCard
          title={data?.[0]?.exploreMore?.title}
          ctaButton={data?.[0]?.exploreMore?.ctaButton}
        />

        <ExploreCard
          lightVariant
          title={data?.[1]?.exploreMore?.title}
          ctaButton={data?.[1]?.exploreMore?.ctaButton}
        />
      </div>
    </div>
  );
};

export default AdvExplore;
