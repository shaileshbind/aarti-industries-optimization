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
    <div>
      <SusBanner data={section_one} />
      <SusCore data={section_two} />
      <AILRoadmap data={section_three} />
      <RespGrowth data={section_four} />
      {globallyCertifiedData && (
        <div className="!mt-[1500px] relative">
          <GloballyCertified itemsData={globallyCertifiedData} />
        </div>
      )}
    </div>
  );
};

export default page;
