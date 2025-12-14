import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { GRExpProps } from "@/app/types/global-reach.type";

const GRExplore = ({ data }: GRExpProps) => {
  const { exploreMore } = data;
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title={exploreMore[0]?.title}
          ctaButton={exploreMore[0]?.ctaButton}
          formTitle=""
        />
        <ExploreCard
          lightVariant
          title={exploreMore[1]?.title}
          ctaButton={exploreMore[1]?.ctaButton}
          formTitle=""
        />
      </div>
    </div>
  );
};

export default GRExplore;
