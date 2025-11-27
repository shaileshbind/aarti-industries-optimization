import { getData } from "@/_lib/getData.fetch";
import React from "react";

export default async function IntimationOfStockExchange() {
  const data = await getData("/disclosures-reports");
  console.log(data);
  
  return (
    <div>
      <div>sd</div>
    </div>
  );
}
