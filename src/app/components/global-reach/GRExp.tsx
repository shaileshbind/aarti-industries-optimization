import React from "react";
import ExploreCard from "../cards/ExploreCard";

const GRExplore = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title="Innovating Whats Next"
          items={[{ id: 0, ctaTitle: "Explore Our R&D", ctaLink: "/r-and-d" }]}
        />
        <ExploreCard
          lightVariant
          title="Building the Future, Together"
          items={[
            { id: 0, ctaTitle: "Partner with Us", ctaLink: "#" },
          ]}
        />
      </div>
    </div>
  );
};

export default GRExplore;
