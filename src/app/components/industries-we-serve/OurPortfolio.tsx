import React from "react";
import { H2 } from "../Typography2";
import TabsAutoplaySection from "../sections/TabsAutoplaySection";

const OurPortfolio = () => {
  const rdSafetyData = [
    {
      id: 0,
      title: "Dyes and Pigments",
      src: "/images/rd/rd-banner.png",
      heading: "Adding colour, responsibly.",
      desc: "AIL is a trusted supplier of dye and pigment intermediates used in textiles, coatings, plastics, inks, and cosmetics. With global demand shifting towards eco-friendly, high-performance colourants, Aarti Industries is leading the way with sustainable intermediates that strike a balance between performance and compliance. Aarti Industries brings decades of leadership in colour chemistry, offering a globally competitive portfolio that helps customers transition towards sustainable and high-performance dyes and pigments.AIL is a trusted supplier of dye and pigment intermediates used in textiles, coatings, plastics, inks, and cosmetics. With global demand shifting towards eco-friendly, high-performance colourants, Aarti Industries i",
      btnTitle: "View our Dyes and Pigments Solutions",
      btnLink: "#",
    },
    {
      id: 1,
      title: "Pharmaceuticals & Healthcare",
      src: "/images/rd/rd-info-banner.png",
      heading: "Safety with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 2,
      title: "Agrochemicals",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 3,
      title: "Polymers and Plasticisers",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 4,
      title: "Refinery and Oil-Field Chemicals",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 5,
      title: "Speciality Chemicals",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 6,
      title: "Consumer Care & FMCG",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 7,
      title: "UV Absorbers",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 8,
      title: "Fertilisers",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Chemistry at the Core.IP-Led Innovation for Growth",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
  ];

  return (
    <div className="my-[50px] lg:my-[100px]">
      <H2 className="mx-[20px] lg:mx-[60px]">Our Diverse Industry Portfolio</H2>
      <div className="mt-[50px]">
        <TabsAutoplaySection data={rdSafetyData} tabClass="!text-[16px]" starImgEffect />
      </div>
    </div>
  );
};

export default OurPortfolio;
