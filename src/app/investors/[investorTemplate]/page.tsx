import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "@/app/components/GloballyCertified";
import FinancialInformation from "@/app/components/investor-templates/FinancialInformation";
import OrangeCardListingPage from "@/app/components/investor-templates/OranegCardListingPage";
import ShareholderInformation from "@/app/components/investor-templates/ShareholderInformation";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    investorTemplate: string;
  };
};

export default async function page({ params }: PageProps) {
  const { investorTemplate } = await params;
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );
  const templates = ["shareholder-information", "financial-information"];

  const orangeCardListingPages = [
    "annual-report",
    "code-and-policies",
    "subsidiaries-and-reports",
    "credit-ratings",
    "memorandum-and-articles-of-association",
  ];

  const allValidTemplates = [...templates, ...orangeCardListingPages];

  // Check if the template is valid
  if (!allValidTemplates.includes(investorTemplate)) {
    return notFound();
  }

  const getTemplateComponent = () => {
    // Check if it's an orange card listing page first
    if (orangeCardListingPages.includes(investorTemplate)) {
      return <OrangeCardListingPage params={investorTemplate} />;
    }

    // Handle other specific templates
    switch (investorTemplate) {
      case templates[0]:
        return <ShareholderInformation />;
      case templates[1]:
        return <FinancialInformation />;
    }
  };

  return (
    <div>
      {getTemplateComponent()}

      {globallyCertifiedData && (
        <div className="mt-[30px] md:mt-[70px] -mb-8 lg:mb-0">
          <GloballyCertified itemsData={globallyCertifiedData} />
        </div>
      )}
    </div>
  );
}
