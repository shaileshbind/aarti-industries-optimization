import React from "react";
import ExploreCard from "../cards/ExploreCard";

const PartneshipExplore = () => {
  return (
    <div className="py-[50px] lg:py-[100px] container">
      <div className="w-full grid lg:flex gap-y-[10px] lg:gap-x-[25px]">
        <ExploreCard
          title={"Your Next-Gen Chemistry Partner Awaits"}
          items={[
            {
              title: "Inquire Now",
              link: "#",
            },
          ]}
        />

        <ExploreCard
          lightVariant
          title={"Our Infrastructure and Manufacturing Capabilities"}
          items={[
            {
              title: "View Our Capabilities",
              link: "#",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PartneshipExplore;
