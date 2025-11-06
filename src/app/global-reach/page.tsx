import React from "react";
import GRBanner from "../components/global-reach/GRBanner";
import GRInfo from "../components/global-reach/GRInfo";
import GloballyCertified from "../components/GloballyCertified";
import GRExplore from "../components/global-reach/GRExp";
import GRMaps from "../components/global-reach/GRMaps";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/global-reach");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const { Section_one, section_two, section_three, section_four } = data;
  return (
    <>
      {Section_one && <GRBanner data={Section_one} />}
      {section_two && <GRInfo data={section_two} />}
      {section_three && <GRMaps data={section_three} />}
      {globallyCertifiedData && (
        <GloballyCertified
          title="Globally Certified"
          itemsData={globallyCertifiedData}
        />
      )}
      {section_four && <GRExplore data={section_four} />}
    </>
  );
};

export default page;
