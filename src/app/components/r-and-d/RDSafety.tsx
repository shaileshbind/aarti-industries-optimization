import React from "react";
import TabsAutoplay from "../sections/TabsAutoplaySection";

const RDSafety = () => {
  const rdSafetyData = [
    {
      id: 0,
      title: "Pipeline & Patents",
      src: "/images/rd/rd-banner.png",
      heading: "Research with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 1,
      title: "Safety & Compliance",
      src: "/images/rd/rd-info-banner.png",
      heading: "Safety with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 2,
      title: "Sustainability",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
  ];

  return (
    <>
      <TabsAutoplay data={rdSafetyData} />
    </>
  );
};

export default RDSafety;
