import MainComponent from "@/app/components/product-inner/MainComponent";
import GloballyCertified from "@/app/components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import { ProductPageProps } from "../../types/product.type";
import SEO from "@/app/components/SEO";

export const dynamic = "force-dynamic";

export default async function ProductInner({ params }: ProductPageProps) {
  const { productId } = await params;
  let relatedData;

  const mainData = await getData(`/products-details/${productId}`);
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*",
  );

  if (mainData) {
    relatedData = await getData(
      `/related-products/${mainData.product_sub_categories[0].slug || ""}`,
    );
  }
  const seo = mainData?.seo;

  return (
    <div>
      <SEO
        title={seo?.title ?? `${mainData?.productName}`}
        metaTitle={seo?.metaTitle ?? `${mainData?.productName}`}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ??
          `https://www.aarti-industries.com/products/${mainData?.slug}`
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

      <MainComponent data={mainData} relatedData={relatedData} />

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
}
