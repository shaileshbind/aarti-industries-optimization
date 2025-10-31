import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import IndustryExp from "../components/industries-we-serve/IndustryExp";
import OurPortfolio from "../components/industries-we-serve/OurPortfolio";
import IndustryBanner from "../components/industries-we-serve/IndustryBanner";
import IndustryInfo from "../components/industries-we-serve/IndustryInfo";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";

const page = async () => {
  const data = await getPageData("/pages/by-slug/industries-we-serve");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const { section_one, section_two, section_three, section_four } = data;

  return (
    <div>
      {section_one && <IndustryBanner data={section_one} />}

      {section_two && <IndustryInfo data={section_two} />}

      {section_three && <OurPortfolio data={section_three} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_four && <IndustryExp data={section_four} />}
    </div>
  );
};

export default page;
