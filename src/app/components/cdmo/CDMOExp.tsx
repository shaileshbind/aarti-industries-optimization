import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { CDMOExpProps } from "@/app/types/cdmo.type";

const CDMOExp: React.FC<CDMOExpProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
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

export default CDMOExp;
