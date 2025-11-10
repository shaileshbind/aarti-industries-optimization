"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { BodyText2, H2 } from "../Typography2";
import MainAccordion from "../Accordion";

export default function WhyAarti() {
  const accordionData = [
    {
      title: "India's Edge",
      description:
        "Use these as icons: 3rd largest economy (GDP, PPP), 6th largest chemical market globally, $1 trillion chemical industry projected by 2030, Skilled workforce and cost-competitive ecosystem.",
      image: {
        url: "/images/partnership/whyAartiBanner.png",
        alternativeText: "banner",
      },
      list: [
        {
          title:
            "India offers cost-competitive manufacturing with global scale.",
        },
        {
          title:
            "Proximity to growing end-markets in Asia, Europe, and the US.",
        },
        {
          title: "Strong policy support for speciality chemical manufacturing.",
        },
      ],
    },
    {
      title: "AIL's Innovation Advantage",
      description:
        "Manufacturing Partnerships (Contract Manufacturing) allow AIL and its partners to co-invest in infrastructure, technologies or the new product, aligning capabilities to unlock innovation and market expansion.",
      image: {
        url: "/images/partnership/stickyBanner.png",
        alternativeText: "banner",
      },
      list: [
        {
          title: "Shared ownership, governance, and operational synergies",
        },
        {
          title: "Shared ownership, governance, and operational synergies",
        },
      ],
    },
  ];

  const [expanded, setExpanded] = useState<number>(0);
  const [activeImage, setactiveImage] = useState<string>(
    accordionData[0]?.image?.url
  );
  const [progress, setProgress] = useState<boolean>(false);
  const [imageFade, setImageFade] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleAccordion = (index: number) => {
    setExpanded(index);
    setImageFade(false);

    setTimeout(() => {
      setactiveImage(accordionData?.[index]?.image?.url);
      setImageFade(true);
    }, 300);

    // Reset progress bar
    setProgress(false);
    setTimeout(() => setProgress(true), 10);

    // Clear existing interval and restart
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAutoRotation();
  };

  const startAutoRotation = () => {
    intervalRef.current = setInterval(() => {
      setExpanded((prevExpanded) => {
        const nextIndex = (prevExpanded + 1) % accordionData.length;

        // Fade out image
        setImageFade(false);

        setTimeout(() => {
          setactiveImage(accordionData[nextIndex]?.image?.url);
          setImageFade(true);
        }, 300);

        // Reset progress bar
        setProgress(false);
        setTimeout(() => setProgress(true), 10);

        return nextIndex;
      });
    }, 5000);
  };

  useEffect(() => {
    // Start progress bar animation
    setProgress(true);
    startAutoRotation();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="fluid-container grid grid-cols-2 gap-[60px] xl:gap-[100px] pb-[110px]">
      <div className="relative h-[317px] lg:h-[600px] w-full overflow-hidden">
        <div className="absolute right-0 top-0 min-h-[317px] lg:min-h-[500px] xl:min-h-[600px] w-[100%] lg:w-full rounded-[20px]">
          <Image
            src={activeImage}
            alt={"banner"}
            fill
            className={`absolute object-cover rounded-[20px] transition-opacity duration-300 ${
              imageFade ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Decorative overlays */}
          <div className="absolute left-0 object-cover backdrop-blur-lg rounded-tl-[20px] lg:rounded-tl-[30px] h-[calc(100%-71px)] lg:h-[calc(100%-93px)] w-[75px] lg:w-[155px]" />
          <div className="absolute bottom-0 right-0 object-cover backdrop-blur-lg lg:rounded-[20px] rounded-b-[20px] h-[calc(100%-245px)] lg:h-[calc(100%-505px)] w-full" />

          <Image
            src="/images/home/star-white.svg"
            alt="star-icon"
            width={72}
            height={72}
            className="absolute bottom-[50px] lg:bottom-[57px] z-10 left-[50px] lg:left-[120px] w-[42px] lg:w-[72px]"
          />
          <div className="absolute min-h-screen bg-white w-[1px] left-[71px] lg:left-[155px]" />
          <div className="absolute w-full bg-white bottom-[71px] lg:bottom-[92.5px] h-[1px]" />
        </div>
      </div>

      <div className="xl:w-[80%] relative">
        <H2>Why India. Why Aarti Industries.</H2>

        <div className="pt-10 xl:pt-[86px]">
          {accordionData?.map((item, index) => (
            <div key={`accordion-${index}`} className="relative">
              <MainAccordion
                expanded={expanded === index}
                showIcon={false}
                onChange={() => handleAccordion(index)}
                title={
                  <h2
                    className={`text-2xl text-[#002F50] opacity-40 ${
                      expanded === index && "opacity-100"
                    }`}
                  >
                    {item?.title}
                  </h2>
                }
              >
                <div>
                  <BodyText2 className="pb-4 ">{item?.description}</BodyText2>

                  <div className="flex flex-col gap-2">
                    {item?.list?.map((listItem, listIndex) => (
                      <div key={"list_" + listIndex} className="flex gap-2">
                        <Image
                          src={"/images/star-orange.svg"}
                          alt="banner"
                          width={20}
                          height={20}
                        />
                        <BodyText2>{listItem?.title}</BodyText2>
                      </div>
                    ))}
                  </div>
                </div>
              </MainAccordion>

              {expanded === index && (
                <div
                  className={`h-[2px] bg-[#DC4C03] absolute bottom-0 transition-all duration-[5000ms] ease-linear ${
                    progress ? "w-full" : "w-0"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
