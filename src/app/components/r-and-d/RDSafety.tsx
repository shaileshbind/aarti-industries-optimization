import React from "react";
import TabsAutoplay from "../sections/TabsAutoplaySection";
import { RDSafetyProps } from "@/app/types/r-and-d.type";

const RDSafety: React.FC<RDSafetyProps> = ({ data }) => {
  const { details } = data;

  return (
    <>
      <TabsAutoplay data={details} />
    </>
  );
};

export default RDSafety;
