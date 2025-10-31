import React from "react";
import Banner from "../components/products/Banner";
import ProductFilterList from "../components/products/ProductFilterList";
import { getPageData } from "@/_lib/pageData.fetch";

export default async function Product() {

  const data = await getPageData("/pages/by-slug/product-listing");

  const {
    section_one,
    product_categories,
  } = data;

  return (
    <>
      <Banner data={section_one} />
      <ProductFilterList catagoriesData={product_categories} />
    </>
  );
}