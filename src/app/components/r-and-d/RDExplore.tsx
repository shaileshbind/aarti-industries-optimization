import React from "react";
import ExploreCard from "../cards/ExploreCard";
import { FadeInReveal } from "../ScrollReveal";

const RDExplore = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <FadeInReveal>
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title="Looking for R&D Solutions?"
          items={[{ id: 0, ctaTitle: "Inquire Now", ctaLink: "#" }]}
        />
        <ExploreCard
          lightVariant
          title="Keep Exploring"
          items={[
            { id: 0, ctaTitle: "Product Portfolio", ctaLink: "#" },
            { id: 1, ctaTitle: "Partner with us", ctaLink: "#" },
          ]}
        />
      </div>
      </FadeInReveal>
    </div>
  );
};

export default RDExplore;
