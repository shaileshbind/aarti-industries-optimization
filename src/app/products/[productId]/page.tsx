
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
  // console.log(mainData?.product_sub_categories[0].slug)
  if(mainData){
  relatedData = await getData(
    `/related-products/${mainData.product_sub_categories[0].slug || ""}`
  );
  }

  return (
    <div>
      <MainComponent data={mainData} relatedData={relatedData} />

      <GloballyCertified
        title="Globally Certified"
        itemsData={[
          {
            id: 0,
            heading: "Ecovadis Gold Rating",
            image: { url: "/images/award1.png", alternativeText: "" },
          },
          {
            id: 1,
            heading: "CDP A rating",
            image: { url: "/images/award2.png", alternativeText: "" },
          },
          {
            id: 2,
            heading: "ISO 27001:2022",
            image: { url: "/images/award3.png", alternativeText: "" },
          },
        ]}
      />
    </div>
  );
}
