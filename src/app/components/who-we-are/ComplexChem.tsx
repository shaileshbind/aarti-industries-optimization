"use client";
import React, { useState, useRef, useEffect } from "react";
import { isMobile } from "react-device-detect";
import { BodyText2, BodyText3, H2, SubH2 } from "../Typography2";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import FaqAccordion from "../FaqAccordian";

const ComplexChem = () => {
  const data = [
    {
      id: 0,
      title: "Custom Product Development and R&D",
      src: "/images/rd/rd-banner.png",
      heading: "Adding colour, responsibly.",
      desc: "Driving innovation across established and emerging value chains with custom chemistries and speciality solutions.",
      btnTitle: "View our Dyes and Pigments Solutions",
      btnLink: "#",
    },
    {
      id: 1,
      title: "Speciality Chemicals",
      src: "/images/rd/rd-info-banner.png",
      heading: "Safety with Responsibility",
      desc: "Driving innovation across established and emerging value chains with custom chemistries and speciality solutions.",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 2,
      title: "Contract Manufacturing and Strategic Partnerships",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Driving innovation across established and emerging value chains with custom chemistries and speciality solutions.",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 3,
      title: "Sustainable and Future-ready Chemistries",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Driving innovation across established and emerging value chains with custom chemistries and speciality solutions.",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
    {
      id: 4,
      title:
        "Distinctive Advantages; Integrated Value Chain and Global Delivery",
      src: "/images/rd/rd-banner.png",
      heading: "Sustainability with Responsibility",
      desc: "Driving innovation across established and emerging value chains with custom chemistries and speciality solutions.",
      btnTitle: "Explore Our Safety Commitment",
      btnLink: "#",
    },
  ];

  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const rafRef = useRef<number | null>(null);

  const startProgress = (index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);

    const duration = 8000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(progressPercent);

      if (progressPercent < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        const nextIndex = (index + 1) % data.length;
        setActive(nextIndex);
        setExpanded(`panel${nextIndex}`);
        if (swiperRef.current) swiperRef.current.slideToLoop(nextIndex);
        startProgress(nextIndex);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startProgress(active);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      const panelIndex = parseInt(panel.replace("panel", ""));
      if (isExpanded) {
        setActive(panelIndex);
        setExpanded(panel);
        startProgress(panelIndex);
      }
    };

  return (
    <div className="py-[50px] lg:py-[100px fluid-container">
      <H2>Bringing Complex Chemistry to Life</H2>
      <div className="mt-[30px] lg:mt-[60px]">
        {data?.map((item, index) => (
          <div key={index} className="relative ">
            <FaqAccordion
              faqTitle={
                <div
                  className={`w-full flex gap-x-[48px] justify-between ${
                    expanded === `panel${index}`
                      ? "my-[unset]"
                      : "my-[18px] lg:my-[30px]"
                  }`}
                >
                  <div className="flex items-start gap-x-[12px] lg:gap-x-[48px]">
                    <BodyText3 className="text-orange-200 mt-[5px]">
                      0{index + 1}
                    </BodyText3>
                    <div>
                      <SubH2 className="max-w-[70%] lg:max-w-[unset]">
                        {item?.title}
                      </SubH2>
                      {expanded === `panel${index}` && (
                        <div className="relative not-last:mt-[20px] hidden lg:block ">
                          <BodyText2 className="mt-[20px] max-w-[650px]">
                            {item?.desc}
                          </BodyText2>
                        </div>
                      )}
                    </div>
                  </div>
                  {expanded === `panel${index}` && (
                    <div className="relative w-[290px] h-[200px] rounded-[20px] overflow-hidden hidden lg:block ">
                      {item?.src && (
                        <Image
                          src={item?.src}
                          alt="img"
                          fill
                          className="object-cover object-top"
                        />
                      )}
                    </div>
                  )}
                </div>
              }
              faqContent={
                <div className="block lg:hidden ml-[26px] mb-[30px]">
                  <BodyText2>{item?.desc}</BodyText2>
                  <div className="mt-[24px] relative  h-[170px] rounded-[10px] overflow-hidden">
                    {item?.src && (
                      <Image
                        src={item?.src}
                        alt="img"
                        fill
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              }
              showIcon={isMobile}
              expanded={expanded === `panel${index}`}
              handleChange={handleChange(`panel${index}`)}
            />
            {/* Grey base line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />

            {/* Orange progress bar */}
            {index === active && (
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                style={{ width: `${progress}%` }}
              />
            )}
            {/* Grey line */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-200" />
            {/* Orange progress bar only for active accordion */}
            {index === active && (
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-orange-200 z-10"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplexChem;
