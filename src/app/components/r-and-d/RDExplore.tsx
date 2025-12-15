import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { RDExploreProps } from "@/app/types/r-and-d.type";

const RDExplore: React.FC<RDExploreProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
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

export default RDExplore;
