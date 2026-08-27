import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { WhoExpProps } from "../../types/who-we-are.type";
import { FadeInReveal } from "../ScrollReveal";

const WhoExp: React.FC<WhoExpProps> = ({ data }) => {
  const { ExlporeCard } = data;
  if (!data || !ExlporeCard || !Array.isArray(ExlporeCard) || ExlporeCard.length === 0) return null;
  return (
    <div className="py-[50px] md:py-[100px] container max-w-[1130px]!">
      <FadeInReveal delay={0.6}>
        <div className="w-full grid md:flex gap-y-[10px] md:gap-x-[25px]">
          <ExploreCard
            title={ExlporeCard?.[0]?.title}
            ctaButton={ExlporeCard?.[0]?.ctaButton}
            formTitle={ExlporeCard?.[0]?.formTitle}
          />
          <ExploreCard
            lightVariant
            title={ExlporeCard?.[1]?.title}
            ctaButton={ExlporeCard?.[1]?.ctaButton}
            formTitle={ExlporeCard?.[1]?.formTitle}
          />
        </div>
      </FadeInReveal>
    </div>
  );
};

export default WhoExp;
