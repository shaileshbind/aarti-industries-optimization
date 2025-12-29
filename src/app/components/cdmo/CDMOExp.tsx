import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { CDMOExpProps } from "@/app/types/cdmo.type";

const CDMOExp: React.FC<CDMOExpProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container !max-w-[1130px]">
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

export default CDMOExp;
