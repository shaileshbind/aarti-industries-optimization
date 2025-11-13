import React from "react";
import WhoBanner from "../components/who-we-are/WhoBanner";
import WhoInfo from "../components/who-we-are/WhoInfo";
import WhoCards from "../components/who-we-are/WhoCards";
import WhoPrinciples from "../components/who-we-are/WhoPrinciples";
import MeetMinds from "../components/who-we-are/MeetMinds";
import ComplexChem from "../components/who-we-are/ComplexChem";
import ShapedBy from "../components/who-we-are/ShapedBy";
import IndustryAccolades from "../components/who-we-are/IndustryAccolades";
import ChemCreates from "../components/who-we-are/ChemCreates";
import GloballyCertified from "../components/GloballyCertified";
import WhoExp from "../components/who-we-are/WhoExp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/who-we-are");
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
    section_eight,
    section_nine,
    section_ten,
  } = data;
  console.log(data);

  return (
    <div>
      {section_one && <WhoBanner data={section_one} />}

      {section_two && <WhoInfo data={section_two} />}

      {section_three && <WhoCards data={section_three} />}

      {section_four && <WhoPrinciples data={section_four} />}

      {section_five && <MeetMinds data={section_five} />}

      {section_six && <ComplexChem data={section_six} />}

      {section_seven && <ShapedBy data={section_seven} />}

      {section_eight && <IndustryAccolades data={section_eight} />}

      {section_nine && <ChemCreates data={section_nine} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_ten && <WhoExp data={section_ten} />}
    </div>
  );
};

export default page;
