import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { InvestorExpProps } from "@/app/types/investor-overview.type";

const InvestorExplore = ({ data }: InvestorExpProps) => {
  const { exploreMore } = data;
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title={exploreMore[0]?.title}
          items={exploreMore[0]?.ctaButton}
        />
        <ExploreCard
          lightVariant
          title={exploreMore[0]?.title}
          items={exploreMore[0]?.ctaButton}
        />
      </div>
    </div>
  );
};

export default InvestorExplore;
