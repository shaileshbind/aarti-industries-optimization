import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import IndustryExp from "../components/industries-we-serve/IndustryExp";
import OurPortfolio from "../components/industries-we-serve/OurPortfolio";
import IndustryBanner from "../components/industries-we-serve/IndustryBanner";
import IndustryInfo from "../components/industries-we-serve/IndustryInfo";

const page = () => {
  return (
    <div>
      <IndustryBanner />
      <IndustryInfo />
      <OurPortfolio />
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
      <IndustryExp />
    </div>
  );
};

export default page;
