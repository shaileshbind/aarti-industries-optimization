import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import ContactBanner from "../components/Contact/ContactBanner";
import WhereWeOperate from "../components/Contact/WhereWeOperate";
import { getPageData } from "@/_lib/pageData.fetch";
import ContactExp from "../components/Contact/ContactExp";
import ContactMap from "../components/Contact/ContactMap";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [data, whereWeOperateData, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/contact-us"),
    getData("/where-we-operates?populate=*"),
    getData("/globally-certified-datas?populate=*"),
  ]);
  const { leftSection, section_two, mapSection } = data;
  return (
    <div>
      {leftSection && <ContactBanner data={leftSection} />}
      {whereWeOperateData && <WhereWeOperate data={whereWeOperateData} />}
      {mapSection && (
        <ContactMap data={mapSection} data2={whereWeOperateData} />
      )}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_two && <ContactExp data={section_two} />}
    </div>
  );
};

export default Page;
