"use client";
import React, { useState } from "react";
import { H2, SubH3 } from "../Typography2";
import Image from "next/image";
import clsx from "clsx";
import { FadeInReveal } from "../ScrollReveal";
import Button from "../Button";
import { useMediaQuery } from "@mui/material";

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
  const isMobile = useMediaQuery("(max-width:820px)");
  const [showAll, setshowAll] = useState<boolean>(false);

  return (
    <div className="fluid-container">
      <H2 className="lg:max-w-[560px]">
        Inside AIL's Manufacturing Excellence
      </H2>

      {cards?.length > 0 && (
        <div className="mt-6 lg:mt-12 flex justify-between">
          <div className="lg:w-[40%] xl:w-[35%] flex flex-col gap-4 lg:gap-6 lg:max-h-[60vh] lg:overflow-y-scroll scrollbar">
            {(isMobile ? (showAll ? cards : cards?.slice(0, 5)) : cards)?.map(
              (item, index) => (
                <div
                  key={"item_" + index}
                  className={clsx(
                    `flex gap-4 items-center cursor-pointer transition-all duration-200`,
                    activeCard === index ? "opacity-100" : "lg:opacity-40"
                  )}
                  onClick={() => setactiveCard(index)}
                >
                  <div
                    className={clsx(
                      `w-[180px] h-[100px] p-1 lg:border-2 rounded-[20px] overflow-hidden `,
                      activeCard === index
                        ? "lg:border-[#DC4C03]"
                        : "border-[#FFF]"
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
                      `lg:max-w-[80%] xl:max-w-[200px] text-[#4C5861]`
                    )}
                  >
                    {item?.title}
                  </SubH3>
                </div>
              )
            )}
          </div>

          {cards?.[activeCard]?.video?.url && (
            <FadeInReveal className="w-1/2 xl:w-[60%] h-[470px] rounded-[20px] overflow-hidden hidden lg:block">
              <video
                width="600"
                height="470"
                className="w-full h-full rounded-[20px] object-cover "
                key={activeCard}
                controls
              >
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

      <div
        className="block lg:hidden mt-9"
        onClick={(e) => {
          e.preventDefault();
          setshowAll(!showAll);
        }}
      >
        {showAll ? <Button title="View less" /> : <Button title="View more" />}
      </div>
    </div>
  );
}
