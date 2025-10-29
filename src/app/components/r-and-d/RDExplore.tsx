import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { FadeInReveal } from "../ScrollReveal";
import { RDExploreProps } from "@/app/types/r-and-d.type";

const RDExplore: React.FC<RDExploreProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <FadeInReveal>
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
      </FadeInReveal>
    </div>
  );
};

export default RDExplore;
