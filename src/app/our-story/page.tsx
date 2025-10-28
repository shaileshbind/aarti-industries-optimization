import React from "react";
import HeroBanner from "../components/our-story/HeroBanner";
import AboutCompany from "../components/our-story/AboutCompany";
import TimeLine from "../components/our-story/TimeLine";
import GlobalInnovation from "../components/our-story/GlobalInnovation";
import GloballyCertified from "../components/GloballyCertified";

function page() {
  return (
    <>
      <HeroBanner
        tag="Our Story"
        title="Rooted in Excellence, Driven By Chemistry"
        image="/images/our-story/our-story-banner.png"
      />

      <AboutCompany />

      <TimeLine />

      <GlobalInnovation />

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
    </>
  );
}

export default page;
