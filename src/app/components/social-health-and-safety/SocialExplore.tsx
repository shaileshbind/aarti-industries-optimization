import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { SocialExploreProps } from "@/app/types/social-health-and-safety.type";

const SocialExplore: React.FC<SocialExploreProps> = ({ data }) => {
  return (
    <div className="py-[50px] md:py-[100px] container max-w-[1130px]!">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px] ">
        <ExploreCard
          title={data?.exploreMore?.[0]?.title} 
          ctaButton={data?.exploreMore?.[0]?.ctaButton}
          formTitle={data?.exploreMore?.[0]?.formTitle}
        />

        <ExploreCard
          lightVariant
          title={data?.exploreMore?.[1]?.title} 
          ctaButton={data?.exploreMore?.[1]?.ctaButton}
           formTitle={data?.exploreMore?.[1]?.formTitle}
        />
      </div>
    </div>
  );
};

export default SocialExplore;
