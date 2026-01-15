import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { ExploreProps } from "@/app/types/manufacturing-capabilities.type";

const Explore: React.FC<ExploreProps> = ({ data }) => {
  const { exploreMore } = data;
  if (!data || !exploreMore || !Array.isArray(exploreMore) || exploreMore.length === 0) return null;

  return (
    <div className="py-[50px] md:py-[100px] container !max-w-[1130px]">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[24px]">
        <ExploreCard
          title={exploreMore?.[0]?.title}
          ctaButton={exploreMore?.[0]?.ctaButton}
          formTitle={exploreMore[0]?.formTitle}
        />
        <ExploreCard
          lightVariant
          title={exploreMore?.[1]?.title}
          ctaButton={exploreMore?.[1]?.ctaButton}
          formTitle={exploreMore[1]?.formTitle}
        />
      </div>
    </div>
  );
};

export default Explore;
