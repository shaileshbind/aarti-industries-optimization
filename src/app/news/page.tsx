import React from "react";
import NewsBanner from "../components/news/NewsBanner";
import NewsListing from "../components/news/NewsListing";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import ContactBanner from "../components/ContactBanner";
import { getPageData } from "@/_lib/pageData.fetch";
import SEO from "../components/SEO";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/news");
  const { section_one, section_two } = data?.data;
  const seo = data?.seo;
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  return (
    <div>
      <SEO
        title={seo?.title ?? "News"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/news"}
        robots={seo?.robots ?? "index, follow"}
        ogURL={seo?.ogURL}
        ogImg={seo?.ogImg?.url}
        ogTitle={seo?.ogTitle}
        ogDesc={seo?.ogDesc}
        twtUrl={seo?.twtUrl}
        twtImg={seo?.twtImg?.url}
        twtTitle={seo?.twtTitle}
        twtDesc={seo?.twtDesc}
        schemaData={seo?.schemaData}
      />
      {section_one && <NewsBanner data={section_one} />}
      <NewsListing />
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_two && <ContactBanner data={section_two} />}
    </div>
  );
};

export default page;
