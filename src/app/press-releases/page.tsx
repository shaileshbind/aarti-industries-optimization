import PressReleaseBanner from "../components/press-releases/PressReleaseBanner";
import { getPageData } from "@/_lib/pageData.fetch";
import PressReleaseYearListing from "../components/press-releases/PressReleaseYearListing";
import SEO from "../components/SEO";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/press-release");
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "Press Releases"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/press-releases"
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
      {data?.data && <PressReleaseBanner data={data?.data} />}
      <PressReleaseYearListing />
    </div>
  );
};

export default page;
