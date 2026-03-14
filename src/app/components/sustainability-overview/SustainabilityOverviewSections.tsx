"use client";

import { MarginProvider, useMargin } from "@/app/contexts/MarginContext";
import RespGrowth from "./RespGrowth";
import GloballyCertified from "../GloballyCertified";
import { RespGrowthProps } from "@/app/types/sustainability.type";
import { ImageProps } from "@/app/types/global.type";
import useMediaQuery from "@mui/material/useMediaQuery";

type GloballyCertifiedItem = {
  id?: number;
  heading?: string;
  image?: ImageProps;
};

type SustainabilityOverviewSectionsProps = {
  sectionFour: RespGrowthProps["data"];
  globallyCertifiedData: GloballyCertifiedItem[] | null | undefined;
};


/** Wraps RespGrowth + spacer + GloballyCertified in MarginProvider. Order: last slide → spacer → Global section → footer. */
export default function SustainabilityOverviewSections({
  sectionFour,
  globallyCertifiedData,
}: SustainabilityOverviewSectionsProps) {
  return (
    <MarginProvider>
      <div className="pt-[120px] lg:pt-[160px] pb-[24px] lg:pb-[60px]">
        <RespGrowth data={sectionFour} />
      </div>
      <MarginSpacer />
      {globallyCertifiedData?.length ? (
        <div className="relative z-10 bg-white">
          <GloballyCertified itemsData={globallyCertifiedData} />
        </div>
      ) : null}
    </MarginProvider>
  );
}

/** Consumes margin from context as a real spacer so Global section and footer stay below RespGrowth. Hidden on mobile to avoid extra gap (RespGrowth’s extraHeight spacer handles mobile). */
function MarginSpacer() {
  const { marginBottom } = useMargin();
  const isTablet = useMediaQuery("(max-width:1023px)");
  if (marginBottom <= 0 || isTablet) return null;
  return (
    <div
      aria-hidden="true"
      className="w-full shrink-0 bg-white"
      style={{ height: `${marginBottom}px` }}
    />
  );
}
