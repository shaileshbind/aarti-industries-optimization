import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { PartneshipExploreProps } from "@/app/types/partnership.type";

const PartneshipExplore: React.FC<PartneshipExploreProps> = ({ data }) => {
  return (
    <div className="py-[50px] md:py-[100px] container !max-w-[1130px]">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
        <ExploreCard
          title={data?.[0]?.exploreMore?.title}
          ctaButton={data?.[0]?.exploreMore?.ctaButton}
          formTitle={data?.[0]?.exploreMore?.formTitle}
        />

        <ExploreCard
          lightVariant
          title={data?.[1]?.exploreMore?.title}
          ctaButton={data?.[1]?.exploreMore?.ctaButton}
          formTitle={data?.[1]?.exploreMore?.formTitle}
        />
      </div>
    </div>
  );
};

export default PartneshipExplore;
