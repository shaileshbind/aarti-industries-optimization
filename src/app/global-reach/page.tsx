import React from "react";
import GRBanner from "../components/global-reach/GRBanner";
import GRInfo from "../components/global-reach/GRInfo";
import GloballyCertified from "../components/GloballyCertified";
import GRExplore from "../components/global-reach/GRExp";

const page = () => {
  return (
    <div>
      <GRBanner />
      <GRInfo />
      <GloballyCertified
        title="Globally Certified"
        itemsData={[
          {
            id: 0,
            title: "Ecovadis Gold Rating",
            imgSrc: "/images/award1.png",
          },
          { id: 1, title: "CDP A rating", imgSrc: "/images/award2.png" },
          { id: 2, title: "ISO 27001:2022", imgSrc: "/images/award3.png" },
        ]}
      />
      <GRExplore />
    </div>
  );
};

export default page;
