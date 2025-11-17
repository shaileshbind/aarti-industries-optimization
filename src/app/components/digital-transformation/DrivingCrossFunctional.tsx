import React from "react";
import TabsAutoplay from "../sections/TabsAutoplaySection";
import { DrivingCrossFunctionalProps } from "@/app/types/digital-transformation.type";

const DrivingCrossFunctional: React.FC<DrivingCrossFunctionalProps> = ({
  data,
}) => {
  const { details } = data;

  return (
    <>
      <TabsAutoplay data={details} />
    </>
  );
};

export default DrivingCrossFunctional;
