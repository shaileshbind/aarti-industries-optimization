import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { IndustryExpProps } from "@/app/types/industries-we-serve.type";
import { FadeInReveal } from "../ScrollReveal";

const IndustryExp: React.FC<IndustryExpProps> = ({ data }) => {
  return (
    <div className="py-[50px] lg:py-[100px] container max-w-[1130px]!" >
      <FadeInReveal delay={0.2}>
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
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
      </FadeInReveal>
    </div>
  );
};

export default IndustryExp;
