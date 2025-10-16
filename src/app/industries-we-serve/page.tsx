import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import IndustryExp from "../components/industries-we-serve/IndustryExp";
import OurPortfolio from "../components/industries-we-serve/OurPortfolio";
import IndustryBanner from "../components/industries-we-serve/IndustryBanner";
import IndustryInfo from "../components/industries-we-serve/IndustryInfo";

const page = () => {
  return (
    <div>
      <IndustryBanner/>
      <IndustryInfo/>
      <OurPortfolio />
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
      <IndustryExp />
    </div>
  );
};

export default page;
