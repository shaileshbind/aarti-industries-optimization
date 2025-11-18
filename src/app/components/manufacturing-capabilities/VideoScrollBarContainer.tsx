"use client";
import React, { useState } from "react";
import { H2, SubH3 } from "../Typography2";
import Image from "next/image";
import clsx from "clsx";
import { FadeInReveal } from "../ScrollReveal";

export default function VideoScrollBarContainer() {
  const cards = [
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon3.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon2.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/move.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon3.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon2.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon3.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon2.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon3.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur.",
      image: {
        url: "/images/environment/e-icon2.png",
        alternativeText: "",
      },
      video: {
        url: "/videos/sample.mp4",
      },
    },
  ];
  const [activeCard, setactiveCard] = useState<number>(0);

  return (
    <div className="fluid-container">
      <H2 className="max-w-[560px]">Inside AIL’s  Manufacturing Excellence</H2>

      {cards?.length > 0 && (
        <div className="mt-12 flex justify-between">
          <div className="w-[40%] xl:w-[35%] flex flex-col gap-6 max-h-[60vh] overflow-y-scroll scrollbar">
            {cards?.map((item, index) => (
              <div
                key={"item_" + index}
                className={clsx(
                  `flex gap-4 items-center cursor-pointer transition-all duration-200`,
                  activeCard === index ? "opacity-100" : "opacity-40"
                )}
                onClick={() => setactiveCard(index)}
              >
                <div
                  className={clsx(
                    `w-[180px] h-[100px] p-1 border-2 rounded-[20px] overflow-hidden`,
                    activeCard === index ? "border-[#DC4C03]" : "border-[#FFF]"
                  )}
                >
                  <Image
                    src={item?.image?.url}
                    alt={item?.image?.alternativeText || "logo"}
                    width={180}
                    height={100}
                    className="w-full h-full rounded-[14px]"
                  />
                </div>

                <SubH3
                  className={clsx(
                    `max-w-[80%] xl:max-w-[200px] text-[#4C5861]`
                  )}
                >
                  {item?.title}
                </SubH3>
              </div>
            ))}
          </div>

          {console.log(activeCard, cards?.[activeCard]?.video?.url)}

          {cards?.[activeCard]?.video?.url && (
            <FadeInReveal className="w-1/2 xl:w-[60%] h-[470px] rounded-[20px] overflow-hidden">
              <video width="600" height="470" className="w-full h-full">
                <source
                  src={cards?.[activeCard]?.video?.url}
                  type="video/mp4"
                />
                <source
                  src={cards?.[activeCard]?.video?.url}
                  type="video/ogg"
                />
              </video>
            </FadeInReveal>
          )}
        </div>
      )}
    </div>
  );
}
