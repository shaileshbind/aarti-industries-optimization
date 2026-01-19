import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { HomeExploreProps } from "@/app/types/home.type";

const HomeExplore: React.FC<HomeExploreProps> = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0 ) return null;
  return (
    <div className="py-[50px] md:py-[100px] container !max-w-[1130px]">
      <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
        <ExploreCard
          title={data?.[0]?.title}
          ctaButton={data?.[0]?.ctaButton}
          formTitle={data?.[0]?.formTitle}
        />
        <ExploreCard
          lightVariant
          title={data?.[1]?.title}
          ctaButton={data?.[1]?.ctaButton}
          formTitle={data?.[1]?.formTitle}
        />
      </div>
    </div>
  );
};

export default HomeExplore;
