import { getDemoData } from "@/_lib/getDemoData.fetch";
import React from "react";
import AartiAdvantageBanner from "../components/aarti-advantage/AartiAdvantageBanner";
import DetailsContainer from "../components/sections/DetailsContainer";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import RDAnalyticalExc from "../components/sections/RDAnalyticalExc";
import AilEdge from "../components/aarti-advantage/AilEdge";
import WorksWithPartners from "../components/partnership/WorksWithPartners";
import AdvExplore from "../components/aarti-advantage/AdvExplore";

export const dynamic = "force-dynamic";

export default async function page() {
  const data = await getDemoData("/pages/by-slug/aarti-advantage");

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
  } = data;

  return (
    <div>
      {section_one && <AartiAdvantageBanner data={section_one} />}

      {section_two && <DetailsContainer data={section_two} />}

      <RDAnalyticalExc data={section_three} sliderData={section_four} />

      {section_five && (
        <div className="py-[72px] lg:py-[140px]">
          <AilEdge data={section_five} />
        </div>
      )}

      {section_six && (
        <div className="pb-[72px] lg:pb-[140px]">
          <WorksWithPartners data={section_six} className="grid-cols-5" />
        </div>
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_seven && <AdvExplore data={section_seven} />}
    </div>
  );
}
