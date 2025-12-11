import React from "react";
import TabsAutoplay from "./TabsAutoplaySection";
import { DrivingCrossFunctionalProps } from "@/app/types/digital-transformation.type";

const DrivingCrossFunctional: React.FC<DrivingCrossFunctionalProps> = ({
  data,
}) => {
  const { details, title } = data;

  return (
    <>
      <TabsAutoplay data={details} title={title} />
    </>
  );
};

export default DrivingCrossFunctional;
