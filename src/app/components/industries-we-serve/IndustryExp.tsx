import React from "react";
import ExploreCard from "../cards/ExploreCard";

const IndustryExp = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title="Ready to Partner Across Industries?"
          items={[
            { id: 0, ctaTitle: "Corporate Brochure PDF", ctaLink: "#" },
            { id: 1, ctaTitle: "Product List PDF", ctaLink: "#" },
          ]}
        />
        <ExploreCard
          lightVariant
          title="Keep Exploring"
          items={[{ id: 0, ctaTitle: "Aarti Advantage", ctaLink: "#" }]}
        />
      </div>
    </div>
  );
};

export default IndustryExp;
