import MahasuperBanner from "../components/mahasuper/MahasuperBanner";
import GloballyCertified from "../components/GloballyCertified";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import SEO from "@/app/components/SEO";
import DetailsContainer from "@/app/components/mahasuper/DetailsContainer";
import ProductPortfolio from "@/app/components/mahasuper/ProductPortfolio";
import CategoryProducts from "@/app/components/mahasuper/CategoryProducts";    
import EmpoweringFarmers from "@/app/components/mahasuper/EmpoweringFarmers";  
import ContactBanner from "@/app/components/ContactBanner";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = await getPageData("/pages/by-slug/maha-super");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
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
        title={seo?.title ?? "Mahasuper"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={seo?.canonical ?? "https://www.aarti-industries.com/mahasuper"}
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
      {section_one && <MahasuperBanner data={section_one} />}
      {section_two && <DetailsContainer data={section_two} />}
      {section_three && <ProductPortfolio data={section_three} />}
      {section_four && <CategoryProducts data={section_four} />}
      {section_five && <EmpoweringFarmers data={section_five} />}
      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
      {section_six && <ContactBanner data={section_six} />}
    </div>
  );
};

export default page;
