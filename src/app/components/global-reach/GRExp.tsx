import React from "react";
import ExploreCard from "../cards/ExploreCard";

const GRExplore = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title="Innovating Whats Next"
          items={[{ id: 0, title: "Explore Our R&D", link: "/r-and-d" }]}
        />
        <ExploreCard
          lightVariant
          title="Building the Future, Together"
          items={[{ id: 0, title: "Partner with Us", link: "#" }]}
        />
      </div>
    </div>
  );
};

export default GRExplore;
