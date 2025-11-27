import React from "react";
import ExploreCard from "../cards/ExploreCard";

const InvestorExplore = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title="Meet the Leaders Shaping Our Vision"
          items={[
            { id: 0, title: "View our Leadership", link: "/market-overview" },
          ]}
        />
        <ExploreCard
          lightVariant
          title="Get to Know Us Better"
          items={[
            { id: 0, title: "View our Leadership", link: "/market-overview" },
          ]}
        />
      </div>
    </div>
  );
};

export default InvestorExplore;
