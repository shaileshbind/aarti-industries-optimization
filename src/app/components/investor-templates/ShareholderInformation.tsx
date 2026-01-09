import { getPageData } from "@/_lib/pageData.fetch";
import ShareHolderBanner from "../shareholder-information/ShareHolderBanner";
import TabsYearsContainer from "../shareholder-information/TabsYearsContainer";
import SEO from "../SEO";

export const dynamic = "force-dynamic";

export default async function ShareholderInformation() {
  const data = await getPageData("/pages/by-slug/shareholder-report");
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Shareholder Information"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          "https://www.aarti-industries.com/investors/shareholder-information"
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
      {data && <ShareHolderBanner data={data?.data} />}
      {data?.data?.shareholder_reports && (
        <TabsYearsContainer data={data?.data?.shareholder_reports} />
      )}
    </div>
  );
}
