"use client";
import React, { useEffect, useState } from "react";
import { H2, SubH2 } from "../Typography2";
import Image from "next/image";

export default function WorksWithPartners() {
  const [activeCard, setactiveCard] = useState<number>(0);
  const cardData = [
    {
      title: "R&D",
      description:
        "Define opportunities together and then turn your concept into a feasible roadmap.",
    },
    {
      title: "Scaleup",
      description:
        "Test ideas on a smaller scale to minimize risk, learn effectively, and ensure success before scaling up.",
    },
    {
      title: "Manufacturing",
      description:
        "Ensure consistent production processes that maintain quality, efficiency, and reliability as you scale.",
    },
    {
      title: "Optimisation",
      description:
        "Ongoing optimisation to enhance efficiency, reduce costs, and improve sustainability.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setactiveCard((prev) => (prev + 1) % cardData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [cardData.length]);

  return (
    <div className="fluid-container">
      <H2>How AIL works with Partners</H2>

      {/* Desktop */}
      <div className="grid-cols-4 mt-[50px] hidden lg:grid">
        {cardData?.map((item, index) => (
          <div key={"card_" + index} className="relative pr-[50px]">
            {index !== cardData?.length - 1 && (
              <>
                {/* Background progress line */}
                <div className="top-progress w-full h-[1px] bg-[#E1E1E1] absolute left-0 top-[10px]" />

                {/* Animated progress bar */}
                {activeCard === index && (
                  <div
                    key={`progress-${activeCard}`}
                    className="h-[2px] bg-[#DC4C03] absolute left-4 top-[10px]"
                    style={{
                      animation: "fillProgress 5s linear forwards",
                    }}
                  />
                )}

                {/* Completed progress bar for previous cards */}
                {activeCard > index && (
                  <div className="h-[2px] bg-[#DC4C03] absolute left-4 top-[10px] w-full" />
                )}
              </>
            )}

            <Image
              src={"/images/star-orange.svg"}
              alt="banner"
              width={20}
              height={20}
              className="relative z-[1]"
            />

            <div
              className={`transition-all duration-500 ${
                activeCard >= index ? "opacity-100" : "opacity-40"
              }`}
            >
              <SubH2 className="pt-7 pb-2">{item?.title}</SubH2>

              <p className="text-base text-[#4C5861]">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="mt-9">
        {cardData?.map((item, index) => (
          <div
            key={"card_" + index}
            className={`flex gap-7 items-start pb-10 relative`}
          >
            {/* Line */}
            {index !== cardData?.length - 1 && (
              <div className="h-full w-[2px] bg-[#E1E1E1] absolute left-[10px] top-4" />
            )}

            <div className="w-6 h-6">
              <Image
                src={"/images/star-orange.svg"}
                alt="banner"
                width={30}
                height={30}
                className="w-full h-full relative z-[1]"
              />
            </div>
            <div className="w-[90%]">
              <SubH2 className="pb-2">{item?.title}</SubH2>

              <p className="text-sm text-[#4C5861]">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fillProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
