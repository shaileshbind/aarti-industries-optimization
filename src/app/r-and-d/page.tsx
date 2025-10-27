import React from "react";
import RDHeroBanner from "../components/r-and-d/RDHeroBanner";
import RDInfo from "../components/r-and-d/RDInfo";
import RDInnovatingChem from "../components/r-and-d/RDInnovatingChem";
import RDDiverseChem from "../components/r-and-d/RDDiverseChem";
import RDSafety from "../components/r-and-d/RDSafety";
import RDAnalyticalExc from "../components/r-and-d/RDAnalyticalExc";
import GloballyCertified from "../components/GloballyCertified";
import RDExplore from "../components/r-and-d/RDExplore";
// import { getPageData } from "@/_lib/pageData.fetch";

const page = async () => {
  // const data = await getPageData("/pages/by-slug/r-and-d");

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
      <RDExplore />
    </div>
  );
};

export default page;
