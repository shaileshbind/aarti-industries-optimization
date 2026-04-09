import { getPageData } from "@/_lib/pageData.fetch";
import SitemapMenu from "../components/sitemap/SitemapMenu";
import SEO from "../components/SEO";
import HeroBanner from "../components/banners/HeroBanner";

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
      <div className="bg-[#F5F8FA] w-full">
        <HeroBanner
          title={"Sitemap"}
          image={"/images/cdmo/cdmo-driving-banner.png"}
          mobImage={"/images/cdmo/cdmo-driving-banner.png"}
          alt="Sitemap"
          mobAlt="Sitemap"
          fullBg
          centerText
        />

        {menu && (
          <div>
            <SitemapMenu menu={menu} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
