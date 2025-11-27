import { getData } from "@/_lib/getData.fetch";
import React from "react";
import StockExchangeContainer from "./StockExchangeContainer";
import { getDisclosureData } from "@/_lib/getDisclosureData.fetch";
import { IntimationOfStockExchangeProps } from "@/app/types/disclosure.type";

export default async function IntimationOfStockExchange({
  template,
}: IntimationOfStockExchangeProps) {
  const categories = await getData("/disclosures-reports");
  const data = await getDisclosureData(`/get-disclosure-report/${template}`);

  return (
    <div>
      <StockExchangeContainer data={data} categories={categories} />
    </div>
  );
}
