import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import ProductWrapper from "../components/products/ProductWrapper";
import { getData } from "@/_lib/getData.fetch";
import GloballyCertified from "../components/GloballyCertified";
import SEO from "../components/SEO";
export const dynamic = "force-dynamic";

export default async function Product() {
  const data = await getPageData("/pages/by-slug/product-listing");
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );
  const { section_one, product_categories } = data?.data;
  const seo = data?.seo;

  return (
    <>
      <SEO
        title={seo?.title ?? "Products"}
        metaTitle={seo?.metaTitle}
        metaDescription={seo?.metaDescription}
        keywords={seo?.keywords}
        canonical={
          seo?.canonical ?? "https://www.aarti-industries.com/products"
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

      <ProductWrapper
        section_one={section_one}
        product_categories={product_categories}
      />

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </>
  );
}
