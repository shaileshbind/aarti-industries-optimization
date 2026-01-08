"use client";

import { MarginProvider } from "@/app/contexts/MarginContext";
import RDAnalyticalExc from "../sections/RDAnalyticalExc";
import RDDiverseChem from "./RDDiverseChem";
import {
  RDAnalyticalExcProps,
  RDDiverseChemProps,
} from "@/app/types/r-and-d.type";

interface RDSectionsProps {
  analyticalExcData?: RDAnalyticalExcProps["data"];
  analyticalExcSliderData?: RDAnalyticalExcProps["sliderData"];
  diverseChemData?: RDDiverseChemProps["data"];
  diverseChemData2?: RDDiverseChemProps["data2"];
}

export default function RDSections({
  analyticalExcData,
  analyticalExcSliderData,
  diverseChemData,
  diverseChemData2,
}: RDSectionsProps) {
  return (
    <MarginProvider>
      {analyticalExcData && analyticalExcSliderData && (
        <RDAnalyticalExc
          data={analyticalExcData}
          sliderData={analyticalExcSliderData}
        />
      )}
      {diverseChemData && diverseChemData2 && (
        <div className="md:pt-30 lg:pt-0">
          <RDDiverseChem data={diverseChemData} data2={diverseChemData2} />
        </div>
      )}
    </MarginProvider>
  );
}
