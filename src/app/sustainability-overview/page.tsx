import React from "react";
import SusBanner from "../components/sustainability-overview/SusBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import SusCore from "../components/sustainability-overview/SusCore";
import AILRoadmap from "../components/sustainability-overview/AILRoadmap";
import RespGrowth from "../components/sustainability-overview/RespGrowth";
import { getPageData } from "@/_lib/pageData.fetch";

export const dynamic = "force-dynamic";
const page = async () => {
  const data = await getPageData("/pages/by-slug/sustainable-overview");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const { section_one, section_two, section_three, section_four } = data;

  return (
    <div className="overflow-hidden w-full">
      <SusBanner data={section_one} />
      <SusCore data={section_two} />
      <AILRoadmap data={section_three} />
      <div className="pt-[160px] pb-[80px] mb-[50px] md:mb-[unset]">
        <RespGrowth data={section_four} />
      </div>
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
};

export default page;
