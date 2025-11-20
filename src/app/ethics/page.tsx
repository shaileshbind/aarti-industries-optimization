import React from "react";
import EthicsAndCode from "../components/ethics/EthicsAndCode";
import WhoBanner from "../components/who-we-are/WhoBanner";
import GloballyCertified from "../components/GloballyCertified";
import WhoExp from "../components/who-we-are/WhoExp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import GlobalInnovation from "../components/sections/GlobalInnovation";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/ethics");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const {
    section_one,
    section_two,
    section_three,
    section_four,
  } = data;

  return (
    <div>
       {section_one && <WhoBanner data={section_one} />} 

      {section_two && <EthicsAndCode data={section_two} />}

      {section_three && <GlobalInnovation data={section_three} />}
      
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_four && <WhoExp data={section_four} />} 
    </div>
  );
};

export default page;
