import React from "react";
import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import ContactBanner from "../components/Contact/ContactBanner";
import ContactBannerBottom from "../components/Contact/ContactBannerBottom";
import WhereWeOperate from "../components/Contact/WhereWeOperate";
import { getPageData } from "@/_lib/pageData.fetch";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const [data, whereWeOperateData, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/contact-us"),
    getData("/where-we-operates?populate=*"),
    getData("/globally-certified-datas?populate=*")
  ])
  const {
    leftSection,
    section_two,
  } = data;
  return (
    <div>
      {leftSection && <ContactBanner data={leftSection} />}
      {whereWeOperateData && <WhereWeOperate data={whereWeOperateData} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_two && <ContactBannerBottom data={section_two} />}
    </div>
  );
};

export default Page;
