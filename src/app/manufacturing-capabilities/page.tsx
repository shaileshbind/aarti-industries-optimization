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
  const data = await getPageData("/pages/by-slug/who-we-are");
  const data2 = await getPageData("/pages/by-slug/home-page");
  const data3 = await getPageData("/pages/by-slug/our-story");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {data?.section_one && <ManufacturingBanner data={data?.section_one} />}

      {data2?.sectionTwo && (
        <DetailsContainer data={data2?.sectionTwo} showBottomLine={false} />
      )}

      <div className="mt-[40px] mb-[72px] lg:mb-[140px]">
        <ScaleUpEngine />
      </div>

      <WhatSets />

      {data3?.section_four && <GlobalInnovation data={data3?.section_four} />}

      <div className="mb-[72px] lg:mb-[140px]">
        <VideoScrollBarContainer />
      </div>

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {data?.section_ten && <Explore data={data?.section_ten} />}
    </div>
  );
}
