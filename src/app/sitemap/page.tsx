import { getPageData } from "@/_lib/pageData.fetch";
import SitemapMenu from "../components/sitemap/SitemapMenu";
import SEO from "../components/SEO";

const page = async () => {
  const pageData = await getPageData("/pages/by-slug/sitemap");
  const menu = pageData?.data?.menu;
  const seo = pageData?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Sitemap"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/sitemap"}
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
      {menu && <SitemapMenu menu={menu} />}
    </div>
  );
};

export default page;
