import { getDisclosureData } from "@/_lib/getDisclosureData.fetch";
import { getData } from "@/_lib/getData.fetch";
import { OrangeCardCategoryListingPageProps } from "@/app/types/disclosure.type";
import ListingContainer from "./ListingContainer";
import SEO from "../../SEO";

export default async function OrangeCardCategoryListingPage({
  template,
}: OrangeCardCategoryListingPageProps) {
  const categories = await getData("/disclosures-reports");
  const data = await getDisclosureData(`/get-disclosure-report/${template}`);
  const seo = data?.seo;

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
      <ListingContainer data={data} categories={categories} />
    </div>
  );
}
