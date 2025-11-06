import React from "react";
import MainComponent from "@/app/components/product-inner/MainComponent";
import GloballyCertified from "@/app/components/GloballyCertified";
import { getData } from "@/_lib/getData.fetch";
import { ProductPageProps } from "../../types/product.type";

export const dynamic = "force-dynamic";

export default async function ProductInner({ params }: ProductPageProps) {
  const { productId } = params;
  let relatedData;

  const mainData = await getData(`/products-details/${productId}`);
  const globallyCertifiedData = await getData(
    "/globally-certified-datas?populate=*"
  );

  if (mainData) {
    relatedData = await getData(
      `/related-products/${mainData.product_sub_categories[0].slug || ""}`
    );
  }

  return (
    <div>
      <MainComponent data={mainData} relatedData={relatedData} />

      {globallyCertifiedData && (
        <GloballyCertified itemsData={globallyCertifiedData} />
      )}
    </div>
  );
}
