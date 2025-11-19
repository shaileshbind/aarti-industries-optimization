import { getPageData } from "@/_lib/pageData.fetch";
import React from "react";
import ManufacturingBanner from "../components/manufacturing-capabilities/ManufacturingBanner";
import DetailsContainer from "../components/sections/DetailsContainer";
import ScaleUpEngine from "../components/manufacturing-capabilities/ScaleUpEngine";
import WhatSets from "../components/manufacturing-capabilities/WhatSets";
import GlobalInnovation from "../components/sections/GlobalInnovation";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import Explore from "../components/manufacturing-capabilities/Explore";
import VideoScrollBarContainer from "../components/manufacturing-capabilities/VideoScrollBarContainer";

export default async function page() {
  const data = await getPageData("/pages/by-slug/manufacturing-capabilities");
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
      {section_one && <ManufacturingBanner data={section_one} />}

      {section_two && (
        <DetailsContainer data={section_two} showBottomLine={false} />
      )}

      {section_three && (
        <div className="mt-[40px] mb-[72px] lg:mb-[140px]">
          <ScaleUpEngine data={section_three} />
        </div>
      )}

      {section_four && <WhatSets data={section_four} />}

      {section_five && <GlobalInnovation data={section_five} />}

      {section_six && (
        <div className="mb-[72px] lg:mb-[140px]">
          <VideoScrollBarContainer data={section_six} />
        </div>
      )}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_seven && <Explore data={section_seven} />}
    </div>
  );
}
