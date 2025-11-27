import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "@/app/components/GloballyCertified";
import IntimationOfStockExchange from "@/app/components/investor-templates/disclosure/IntimationOfStockExchange";
import OrangeCardCategoryListingPage from "@/app/components/investor-templates/disclosure/OrangeCardCategoryListingPage";
import { notFound } from "next/navigation";
import React from "react";

type PageProps = {
  params: Promise<{
    disclosureTemplate: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { disclosureTemplate } = await params;
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  const templates = ["intimation-of-stock-exchange"];

  const orangeCardCategoryListingPages = [
    "disclosure",
    "corporate-restructuring",
    "regulation",
  ];

  const allValidTemplates = [...templates, ...orangeCardCategoryListingPages];

  // Check if the template is valid
  if (!allValidTemplates.includes(disclosureTemplate)) {
    return notFound();
  }

  const getTemplateComponent = () => {
    // Check if it's an orange card listing page first
    if (orangeCardCategoryListingPages.includes(disclosureTemplate)) {
      return <OrangeCardCategoryListingPage template={disclosureTemplate} />;
    }

    // Handle other specific templates
    switch (disclosureTemplate) {
      case templates[0]:
        return <IntimationOfStockExchange template={disclosureTemplate} />;
    }
  };

  return (
    <div>
      {getTemplateComponent()}

      {globallyCertifiedData && (
        <div className="mt-[30px] md:mt-[70px]">
          <GloballyCertified itemsData={globallyCertifiedData} />
        </div>
      )}
    </div>
  );
}
