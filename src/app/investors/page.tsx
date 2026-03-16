import InvestorBanner from "../components/investor-overview/InvestorBanner";
import InvestorBlueSection from "../components/investor-overview/InvestorBlueSection";
import InvestorLeaders from "../components/investor-overview/InvestorLeaders";
import QuarterlyHigh from "../components/investor-overview/QuarterlyHigh";
import KeyInvestors from "../components/investor-overview/KeyInvestors";
import InHeadlines from "../components/investor-overview/InHeadlines";
import InvestorContacts from "../components/investor-overview/InvestorContacts";
import InvestorExplore from "../components/investor-overview/InvestorExplore";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import SEO from "../components/SEO";
import { getPageData } from "@/_lib/pageData.fetch";

const page = async () => {
  const [data, globallyCertifiedData] = await Promise.all([
    getPageData("/pages/by-slug/investor-overview"),
    getData("/globally-certified-datas?populate=*"),
  ]);
  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
  } = data?.data;
  const seo = data?.seo;
  return (
    <div>
      <SEO
        title={seo?.title ?? "Investors"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/investors"
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
      {section_one && <InvestorBanner data={section_one} />}
      {section_one && <InvestorBlueSection data={section_one} />}
      {section_two && <InvestorLeaders data={section_two} />}
      {section_three && <QuarterlyHigh data={section_three} />}
      {section_four && <KeyInvestors data={section_four} />}
      {section_five && <InHeadlines data={section_five} />}
      {section_six && <InvestorContacts data={section_six} />}
      {globallyCertifiedData && (
        <GloballyCertified
          title="Globally Certified"
          itemsData={globallyCertifiedData}
        />
      )}
      {section_seven && <InvestorExplore data={section_seven} />}
    </div>
  );
};

export default page;
