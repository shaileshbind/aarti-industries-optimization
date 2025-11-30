import { getData } from "@/_lib/getData.fetch";
import { getPageData } from "@/_lib/pageData.fetch";
import React from "react";
import BlogBanner from "../components/blogs/BlogBanner";
import GloballyCertified from "../components/GloballyCertified";
import ContactBanner from "../components/ContactBanner";
import LatestBlog from "../components/blogs/LatestBlog";
import BlogAndCaseStudies from "../components/blogs/BlogAndCaseStudies";

export default async function page() {
  const data = await getPageData("/pages/by-slug/home-page");
  const data2 = await getPageData(
    "/pages/by-slug/financial-information-report"
  );

  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      <BlogBanner data={data2} />

      <div className="py-[72px] lg:py-[100px]">
        <LatestBlog />
      </div>

      <div className="pb-[72px] lg:pb-[100px]">
        <BlogAndCaseStudies data={data?.sectionNine} />
      </div>

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {data?.sectionTen && <ContactBanner data={data?.sectionTen} />}
    </div>
  );
}
