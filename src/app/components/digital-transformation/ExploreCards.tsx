import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { ExploreCardsProps } from "@/app/types/digital-transformation.type";

const ExploreCards: React.FC<ExploreCardsProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
        <ExploreCard title={data?.[0]?.title} items={data?.[0]?.ctaButton} />

        <ExploreCard
          lightVariant
          title={data?.[1]?.title}
          items={data?.[1]?.ctaButton}
        />
      </div>
    </div>
  );
};

export default ExploreCards;
