import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "@/app/components/GloballyCertified";
import OrangeCardListingPage from "@/app/components/investor-templates/OranegCardListingPage";

export const dynamic = "force-dynamic";

export default async function SustainabilityReportPage() {
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  return (
    <div>
      <OrangeCardListingPage params="sustainability-report" />

      {globallyCertifiedData && (
        <div className="mt-[30px] md:mt-[70px] -mb-8 lg:mb-0">
          <GloballyCertified itemsData={globallyCertifiedData} />
        </div>
      )}
    </div>
  );
}
