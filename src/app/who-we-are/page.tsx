import React from "react";
import WhoBanner from "../components/who-we-are/WhoBanner";
import WhoInfo from "../components/who-we-are/WhoInfo";
import WhoCards from "../components/who-we-are/WhoCards";
import WhoPrinciples from "../components/who-we-are/WhoPrinciples";
import MeetMinds from "../components/who-we-are/MeetMinds";
import ComplexChem from "../components/who-we-are/ComplexChem";
import ShapedBy from "../components/who-we-are/ShapedBy";
import IndustryAccolades from "../components/who-we-are/IndustryAccolades";
import ChemCreates from "../components/who-we-are/ChemCreates";
import GloballyCertified from "../components/GloballyCertified";
import WhoExp from "../components/who-we-are/WhoExp";

const page = () => {
  return (
    <div>
      <WhoBanner />
      <WhoInfo />
      <WhoCards />
      <WhoPrinciples />
      <MeetMinds />
      <ComplexChem />
      <ShapedBy />
      <IndustryAccolades />
      <ChemCreates />
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
      <WhoExp />
    </div>
  );
};

export default page;
