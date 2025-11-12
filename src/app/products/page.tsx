import React from "react";
import { getPageData } from "@/_lib/pageData.fetch";
import ProductWrapper from "../components/products/ProductWrapper";

export const dynamic = "force-dynamic";

export default async function Product() {

  const data = await getPageData("/pages/by-slug/product-listing");

  const {
    section_one,
    product_categories,
  } = data;
console.log(data);
  return (
    <>
      {/* <Banner data={section_one} />
      <ProductFilterList catagoriesData={product_categories} /> */}
      <ProductWrapper section_one={section_one} product_categories={product_categories}/>
    </>
  );
}