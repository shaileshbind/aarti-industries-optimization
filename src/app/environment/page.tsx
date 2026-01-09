import EnvBanner from "../components/environment/EnvBanner";
import EnvInfo from "../components/environment/EnvInfo";
import EnvCards from "../components/environment/EnvCards";
import EnvStrong from "../components/environment/EnvStrong";
import EnvLatest from "../components/environment/EnvLatest";
import GloballyCertified from "../components/GloballyCertified";
import EnvExp from "../components/environment/EnvExp";
import EnvResp from "../components/environment/EnvResp";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import SEO from "../components/SEO";
export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/environment");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
  } = data?.data;
  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Environment"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/environment"
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
      {section_one && <EnvBanner data={section_one} />}
      {section_two && <EnvInfo data={section_two} />}
      {section_two && <EnvCards data={section_two} />}
      {section_three && <EnvResp data={section_three} />}
      {section_four && <EnvStrong data={section_four} />}
      {section_five && <EnvLatest data={section_five} />}
      <GloballyCertified
        title="Globally Certified"
        itemsData={globallyCertifiedData}
      />
      {section_six && <EnvExp data={section_six} />}
    </div>
  );
};

export default page;
