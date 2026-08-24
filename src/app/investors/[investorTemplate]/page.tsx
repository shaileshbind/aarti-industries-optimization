import { Suspense } from "react";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "@/app/components/GloballyCertified";
import FinancialInformation from "@/app/components/investor-templates/FinancialInformation";
import OrangeCardListingPage from "@/app/components/investor-templates/OranegCardListingPage";
import ShareholderInformation from "@/app/components/investor-templates/ShareholderInformation";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{
    investorTemplate: string;
  }>;
};

const TEMPLATES: string[] = ["shareholder-information", "financial-information"];

const ORANGE_CARD_LISTING_PAGES: string[] = [
  "annual-report",
  "code-and-policies",
  "subsidiaries-and-reports",
  "credit-ratings",
  "memorandum-and-articles-of-association",
];

const ALL_VALID_TEMPLATES: string[] = [
  ...TEMPLATES,
  ...ORANGE_CARD_LISTING_PAGES,
];

// NOTE: `generateStaticParams` would be the biggest TTFB win here, since the
// valid templates are a closed hardcoded list. It is currently NOT possible:
// ten components in these template trees call `useSearchParams()` - including
// templates/YearQuarterListing, which financial-information renders - and that
// forces a client-side-rendering bailout that fails static prerendering. Making
// these routes static requires either dropping those search-param dependencies
// or wrapping each listing in its own Suspense boundary, which would remove the
// report listings from the prerendered HTML.

/**
 * Fetches its own data so it no longer blocks the page. This section renders at
 * the very bottom of the route, but awaiting it in the page body meant a
 * below-the-fold request had to resolve before the hero could even begin
 * rendering. Behind Suspense it streams in independently.
 */
async function GloballyCertifiedSection() {
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );

  if (!globallyCertifiedData) return null;

  return (
    <div className="mt-[30px] md:mt-[70px] -mb-8 lg:mb-0">
      <GloballyCertified itemsData={globallyCertifiedData} />
    </div>
  );
}

export default async function page({ params }: PageProps) {
  const { investorTemplate } = await params;

  // Check if the template is valid
  if (!ALL_VALID_TEMPLATES.includes(investorTemplate)) {
    return notFound();
  }

  const getTemplateComponent = () => {
    // Check if it's an orange card listing page first
    if (ORANGE_CARD_LISTING_PAGES.includes(investorTemplate)) {
      return <OrangeCardListingPage params={investorTemplate} />;
    }

    // Handle other specific templates
    switch (investorTemplate) {
      case TEMPLATES[0]:
        return <ShareholderInformation />;
      case TEMPLATES[1]:
        return <FinancialInformation />;
    }
  };

  return (
    <div>
      {getTemplateComponent()}

      <Suspense fallback={null}>
        <GloballyCertifiedSection />
      </Suspense>
    </div>
  );
}
