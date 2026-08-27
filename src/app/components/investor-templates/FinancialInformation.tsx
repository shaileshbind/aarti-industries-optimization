import { getPageData } from "@/_lib/pageData.fetch";
import FinancialBanner from "../financial-information/FinancialBanner";
import YearQuarterListing from "../templates/YearQuarterListing";
import SEO from "../SEO";

export default async function FinancialInformation() {
  const data = await getPageData("/pages/by-slug/financial-information-report");
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "Financial Information"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/investors/financial-information"
        }
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
      {data && <FinancialBanner data={data?.data} />}
      {data?.data?.financial_information_reports?.[0]?.reportLayout && (
        <YearQuarterListing
          reportLayout={
            data?.data?.financial_information_reports?.[0]?.reportLayout
          }
          showFinancialYear
        />
      )}
    </div>
  );
}
