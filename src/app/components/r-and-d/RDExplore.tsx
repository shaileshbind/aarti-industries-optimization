import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { RDExploreProps } from "@/app/types/r-and-d.type";
import { FadeInReveal } from "../ScrollReveal";

const RDExplore: React.FC<RDExploreProps> = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0 || !data[0]?.exploreMore || !data[1]?.exploreMore) return null;
  return (
    <div className="py-[50px] lg:py-[100px] container max-w-[1130px]!">
      <FadeInReveal delay={0.2}>
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
      </FadeInReveal>
    </div>
  );
};

export default RDExplore;
