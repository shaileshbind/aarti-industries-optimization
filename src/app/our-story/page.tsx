import React from "react";
import HeroBanner from "../components/our-story/HeroBanner";
import AboutCompany from "../components/our-story/AboutCompany";
import TimeLine from "../components/our-story/TimeLine";
import GlobalInnovation from "../components/our-story/GlobalInnovation";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";


export default async function page() {

  const data = await getPageData("/pages/by-slug/our-story");

    const {
    section_one,
    section_two,
    section_three,
    section_four,
  } = data;

  console.log(data,"our story data")

  return (
    <>
      <HeroBanner data={section_one}/>

      <AboutCompany data={section_two} />

      <TimeLine data={section_three} />

      <GlobalInnovation data={section_four} />

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
