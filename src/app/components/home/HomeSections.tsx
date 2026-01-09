"use client";

import { MarginProvider } from "@/app/contexts/MarginContext";
import SustainableChem from "./SustainableChem";
import HomeMap from "./HomeMap";
import { SustainableChemProps } from "@/app/types/home.type";

interface HomeSectionsProps {
  sustainableChemData?: SustainableChemProps["data"];
}

export default function HomeSections({
  sustainableChemData,
}: HomeSectionsProps) {
  return (
    <MarginProvider>
      {sustainableChemData && <SustainableChem data={sustainableChemData} />}
      <HomeMap />
    </MarginProvider>
  );
}
