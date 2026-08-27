"use client";

import PeopleVision from "./PeopleVision";
import AartiEngage from "./AartiEngage";
import { LAAVisionProps, LAAEngageProps } from "@/app/types/life-at-aarti.type";
import { MarginProvider } from "@/app/contexts/MarginContext";
interface LifeAtSectionsProps {
  peopleVisionData?: LAAVisionProps["data"];
  aartiEngageData?: LAAEngageProps["data"];
}

export default function LifeAtSections({
  peopleVisionData,
  aartiEngageData,
}: LifeAtSectionsProps) {
  return (
    <MarginProvider>
      {peopleVisionData && <PeopleVision data={peopleVisionData} />}
      {aartiEngageData && <AartiEngage data={aartiEngageData} />}
    </MarginProvider>
  );
}
