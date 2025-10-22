import React from "react";
import RDHeroBanner from "../components/r-and-d/RDHeroBanner";
import RDInfo from "../components/r-and-d/RDInfo";
import RDInnovatingChem from "../components/r-and-d/RDInnovatingChem";
import RDDiverseChem from "../components/r-and-d/RDDiverseChem";
import RDSafety from "../components/r-and-d/RDSafety";
import RDAnalyticalExc from "../components/r-and-d/RDAnalyticalExc";
import GloballyCertified from "../components/GloballyCertified";
import RDExplore from "../components/r-and-d/RDExplore";
import { getPageData } from "@/_lib/pageData.fetch";

const page = async() => {
  const data = await getPageData("/pages/by-slug/r-and-d");
  
    // const {
    //   sectionOne,
    //   sectionTwo,
    //   sectionThree,
    //   sectionFour,
    //   sectionFive,
    //   sectionSix,
    //   sectionSeven,
    //   sectionEight,
    //   sectionNine,
    //   sectionTen,
    // } = data;

  return (
    <div>
      <RDHeroBanner />
      <RDInfo />
      <RDInnovatingChem />
      <RDAnalyticalExc />
      <RDDiverseChem />
      <RDSafety />
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
      <RDExplore />
    </div>
  );
};

export default page;
