import React from "react";
import HeroBanner from "../components/our-story/HeroBanner";
import AboutCompany from "../components/our-story/AboutCompany";
import TimeLine from "../components/our-story/TimeLine";
import GlobalInnovation from "../components/sections/GlobalInnovation";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getPageData("/pages/by-slug/our-story");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  console.log(data);

  const { section_one, section_two, section_three, section_four } = data;

  return (
    <>
      {section_one && <HeroBanner data={section_one} />}

      {section_two && <AboutCompany data={section_two} />}

      {section_three && <TimeLine data={section_three} />}

      {section_four && <GlobalInnovation data={section_four} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </>
  );
}
