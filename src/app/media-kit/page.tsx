import GloballyCertified from "../components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import MediaContainer from "../components/media-kit/MediaContainer";
import MediaBanner from "../components/media-kit/MediaBanner";
import ContactBanner from "../components/ContactBanner";
import SEO from "../components/SEO";
import { getPageData } from "@/_lib/pageData.fetch";

export default async function page() {
  const [data, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/media-kit"),
    getData("/globally-certified-datas?populate=*"),
  ]);

  const { section_one, section_two, section_three } = data?.data ?? {};
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Media Kit"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/media-kit"
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

      {section_one && <MediaBanner data={section_one} />}

      {section_two && <MediaContainer data={section_two} />}

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}

      {section_three && <ContactBanner data={section_three} />}
    </div>
  );
}
