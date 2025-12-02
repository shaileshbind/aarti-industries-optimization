import React from "react";
import SustainabilityTransparancy from "../components/supply-chain/SustainabilityTransparancy";
import KeyRawMaterials from "../components/supply-chain/KeyRawMaterials";

export default function page() {
  return (
    <div>
      <div className="py-[72px] lg:py-[140px]">
        <SustainabilityTransparancy />
      </div>

      <KeyRawMaterials />
    </div>
  );
}
