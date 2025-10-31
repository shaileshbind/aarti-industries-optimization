import React from "react";
import GRBanner from "../components/global-reach/GRBanner";
import GRInfo from "../components/global-reach/GRInfo";
import GloballyCertified from "../components/GloballyCertified";
import GRExplore from "../components/global-reach/GRExp";
import GRMaps from "../components/global-reach/GRMaps";


const page = () => {
  return (
    <div>
      <GRBanner />
      <GRInfo />
      <GRMaps />
      <GloballyCertified
        title="Globally Certified"
        itemsData={[
          {
            id: 0,
            heading: "Ecovadis Gold Rating",
            image: { url: "/images/award1.png", alternativeText: "" },
          },
          {
            id: 1,
            heading: "CDP A rating",
            image: { url: "/images/award2.png", alternativeText: "" },
          },
          {
            id: 2,
            heading: "ISO 27001:2022",
            image: { url: "/images/award3.png", alternativeText: "" },
          },
        ]}
      />
      <GRExplore />
    </div>
  );
};

export default page;
