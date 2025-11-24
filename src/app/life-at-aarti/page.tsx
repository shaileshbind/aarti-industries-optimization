import React from "react";
import LifeAtBanner from "../components/life-at-aarti/LifeAtBanner";
import LifeAtValues from "../components/life-at-aarti/LifeAtValues";
import PeopleVision from "../components/life-at-aarti/PeopleVision";
import AartiEngage from "../components/life-at-aarti/AartiEngage";
import AartiNirvana from "../components/life-at-aarti/AartiNirvana";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import ContactBanner from "../components/ContactBanner";
import AartiWorldLeader from "../components/life-at-aarti/AartiWorldLeader";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/life-at-aarti");
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
   gallery,
  } = data;

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      {section_one && <LifeAtBanner data={section_one} />}
      {section_two && <LifeAtValues data2={section_two} />}
      {section_three && <PeopleVision data={section_three} />}
      {section_four && <AartiEngage data={section_four} />}
      {section_five && <AartiNirvana data={section_five}  dataImg={gallery}/>}
      {section_six && <AartiWorldLeader data={section_six} />}
      <GloballyCertified
        title="Globally Certified"
        itemsData={globallyCertifiedData}
      />
      {section_seven && <ContactBanner data={section_seven} />}
    </div>
  );
};

export default page;
