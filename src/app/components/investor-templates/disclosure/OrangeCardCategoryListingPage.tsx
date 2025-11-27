import React from "react";
import { getDisclosureData } from "@/_lib/getDisclosureData.fetch";
import { getData } from "@/_lib/getData.fetch";
import { OrangeCardCategoryListingPageProps } from "@/app/types/disclosure.type";
import ListingContainer from "./ListingContainer";

export default async function OrangeCardCategoryListingPage({
  template,
}: OrangeCardCategoryListingPageProps) {
  const categories = await getData("/disclosures-reports");
  const data = await getDisclosureData(`/get-disclosure-report/${template}`);

  return (
    <div>
      <ListingContainer data={data} categories={categories} />
    </div>
  );
}
