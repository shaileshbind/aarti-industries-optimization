import { Suspense } from "react";
import SustainabilityTransparancy from "../../components/supply-chain/SustainabilityTransparancy";
import KeyRawMaterials from "../../components/supply-chain/KeyRawMaterials";
import SupplyChainBanner from "../../components/supply-chain/SupplyBanner";
import { getPageData } from "@/_lib/pageData.fetch";
import { getData } from "@/_lib/getData.fetch";
import SEO from "../../components/SEO";
import DetailsContainer from "../../components/sections/DetailsContainer";
import RDInfo from "../../components/sections/RDInfo";
import GloballyCertified from "../../components/GloballyCertified";
import FrameworkForged from "../../components/sections/FrameworkForged";
import DrivingCrossFunctional from "../../components/sections/DrivingCrossFunctional";
import ContactBanner from "../../components/ContactBanner";

/**
 * Fetches its own data behind Suspense. Previously this was awaited alongside
 * the page fetch in the same Promise.all, which meant the hero could not render
 * until BOTH resolved - so a request for a logo strip at the very bottom of the
 * page gated the LCP element. Parallel is not the same as non-blocking.
 */
async function GloballyCertifiedSection() {
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );

  if (!globallyCertifiedData) return null;

  return <GloballyCertified itemsData={globallyCertifiedData} />;
}

export default async function page() {
  const data = await getPageData("/pages/by-slug/responsible-supply-chain");

  const {
    section_one,
    section_two,
    section_three,
    section_four,
    section_five,
    section_six,
    section_seven,
    section_eight,
  } = data?.data ?? {};

  const seo = data?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? "Aarti Industries"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/sustainability/responsible-supply-chain"
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

      {section_one && <SupplyChainBanner data={section_one} />}

      {section_two && (
        <DetailsContainer data={section_two} showBottomLine={false} />
      )}

      {section_three && <RDInfo data={section_three} showLine={false} />}

      {section_four && (
        <div className="">
          <SustainabilityTransparancy data={section_four} />
        </div>
      )}

      {section_five && (
        <div className="my-[72px] lg:my-[120px]">
          <FrameworkForged data={section_five} />
        </div>
      )}

      {section_six && <DrivingCrossFunctional data={section_six} />}

      {section_seven && (
        <div className="pb-[72px] pt-[22px] lg:py-[140px]">
          <KeyRawMaterials data={section_seven} />
        </div>
      )}

      <Suspense fallback={null}>
        <GloballyCertifiedSection />
      </Suspense>

      {section_eight && <ContactBanner data={section_eight} />}
    </div>
  );
}
