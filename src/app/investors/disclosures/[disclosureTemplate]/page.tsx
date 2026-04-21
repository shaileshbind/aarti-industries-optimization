import { getData } from "@/_lib/getData.fetch";
import { getDisclosureData } from "@/_lib/getDisclosureData.fetch";
import GloballyCertified from "@/app/components/GloballyCertified";
import SEO from "@/app/components/SEO";
import ListingContainer from "@/app/components/investor-templates/disclosure/ListingContainer";
import StockExchangeContainer from "@/app/components/investor-templates/disclosure/StockExchangeContainer";
import RichTextContainer from "@/app/components/investor-templates/disclosure/RichTextContainer";
import SubCategoryReportContainer from "@/app/components/investor-templates/disclosure/SubCategoryReportContainer";
import { notFound } from "next/navigation";
import YearAndReportContainer from "@/app/components/investor-templates/disclosure/YearAndReportContainer";

type PageProps = {
  params: Promise<{
    disclosureTemplate: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { disclosureTemplate } = await params;
  const [globallyCertifiedData, categories, data] = await Promise.all([
    getData("/globally-certified-datas?populate=*"),
    getData("/disclosures-reports?populate=*"),
    getDisclosureData(`/get-disclosure-report/${disclosureTemplate}`),
  ]);

  const validSlugs: string[] =
    categories?.map((c: { slug: string }) => c.slug) ?? [];

  if (!validSlugs.includes(disclosureTemplate) || !data) {
    return notFound();
  }

  const seo = data?.seo;
  const componentType: string = data?.reportLayout?.[0]?.__component ?? "";

  const renderTemplate = () => {
    switch (componentType) {
      case "reports.sub-year-and-quarter":
        return <StockExchangeContainer data={data} categories={categories} />;
      case "reports.sub-year-and-report":
        return <YearAndReportContainer data={data} categories={categories} />;
      case "reports.sub-category-with-report":
        return (
          <SubCategoryReportContainer data={data} categories={categories} />
        );
      case "reports.ck-edit":
        return <RichTextContainer data={data} categories={categories} />;
      case "reports.simple-list":
      default:
        return <ListingContainer data={data} categories={categories} />;
    }
  };

  return (
    <div>
      <SEO
        title={seo?.title ?? data?.category}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          `https://www.aarti-industries.com/disclosures/${data?.slug}`
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

      {renderTemplate()}

      {globallyCertifiedData && (
        <div className="mt-[30px] md:mt-[70px]">
          <GloballyCertified itemsData={globallyCertifiedData} />
        </div>
      )}
    </div>
  );
}
