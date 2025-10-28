import React from "react";
import ExploreCard from "../cards/ExploreCard";

const IndustryExp = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title="Ready to Partner Across Industries?"
          items={[
            { id: 0, title: "Corporate Brochure PDF", link: "#" },
            { id: 1, title: "Product List PDF", link: "#" },
          ]}
        />
        <ExploreCard
          lightVariant
          title="Keep Exploring"
          items={[{ id: 0, title: "Aarti Advantage", link: "#" }]}
        />
      </div>
    </div>
  );
};

export default IndustryExp;
