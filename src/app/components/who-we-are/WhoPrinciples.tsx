"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { H2 } from "../Typography2";
import Image from "next/image";
import { WhoPrinciplesProps } from "@/app/types/who-we-are.type";

const WhoPrinciples: React.FC<WhoPrinciplesProps> = ({ data }) => {
  const { description, content } = data;

  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-5xl mx-auto md:py-[100px] py-[50px]">
      {description && (
        <H2 className="max-w-xl mx-auto text-center py-3 md:py-9">
          {description}
        </H2>
      )}
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-row items-stretch overflow-hidden relative fluid-container">
        {/* Left Tabs + Progress Bar */}
        <div className="relative bg-white text-white md:w-[40%] flex flex-col justify-center">
          <div className="relative flex gap-4">
            {/* Progress Bar */}
            {content?.length > 0 && (
              <div className="relative flex flex-col items-center justify-center">
                {content?.map((_, index) => (
                  <div
                    key={index}
                    className={`w-[3px] rounded-full transition-all duration-300 my-1 ${
                      index === active ? "bg-amber-600 h-12" : "bg-gray-300 h-7"
                    }`}
                  ></div>
                ))}
              </div>
            )}

            {/* Tabs */}
            {content?.length > 0 && (
              <div className="space-y-6 w-full bg-gradient-orange-1 p-8 rounded-2xl relative flex flex-col">
                {content?.map(
                  (tab, index) =>
                    tab?.value && (
                      <button
                        key={tab.id}
                        onClick={() => setActive(index)}
                        className="relative"
                      >
                        <H2
                          className={clsx(
                            "block text-left transition-all duration-300 cursor-pointer  ",
                            active === index
                              ? "text-white "
                              : "text-white/40 !text-[36px] hover:text-white/80"
                          )}
                        >
                          {tab?.value}
                        </H2>
                        {active === index && (
                          <Image
                            src="/images/home/star-white.svg"
                            alt="img"
                            width={42}
                            height={42}
                            className="absolute z-10 right-[-60px] top-[50%] translate-y-[-50%] w-[42px] md:w-[52px]"
                          />
                        )}
                      </button>
                    )
                )}

                <Image
                  src="/images/home/flower-t.svg"
                  alt="img"
                  width={151}
                  height={151}
                  className="absolute bottom-[35px] md:bottom-[-30px] -right-[18px] md:-right-[30px] w-[93px] h-[93px] md:w-[151px] md:h-[151px]"
                />
              </div>
            )}
          </div>
        </div>
        {/* Right Content */}
        <div className="bg-[#F5F8FA] text-[#0D2B3E] flex-1 p-12 flex items-center rounded-r-2xl">
          {content[active]?.description && (
            <div
              dangerouslySetInnerHTML={{ __html: content[active].description }}
              className="font-normal text-[18px] md:text-[22px] xl:text-[24px] leading-[140%] text-blue-200 font-alte-hans"
            />
          )}
        </div>
      </div>
      {/* Mobile Accordion */}
      {content?.length > 0 && (
        <div className="md:hidden mt-6 space-y-3 bg-[#F5F8FA] rounded-2xl fluid-container">
          {content?.map((tab, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={tab.id}
                className={clsx(
                  `border-b border-gray-200 overflow-hidden transition-all duration-500 ease-in-out mx-[20px]`,
                  content?.length - 1 === index && "border-b-0"
                )}
              >
                {/* Header Button */}
                {tab?.value && (
                  <button
                    className={clsx(
                      "w-full text-left p-5 pt-2 rounded-2xl flex justify-between items-center transition-all duration-300 relative ",
                      isOpen
                        ? "bg-gradient-orange-1 text-white pt-5"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <p
                      className={clsx(
                        "transition-colors duration-100 text-[24px]",
                        isOpen ? "text-white" : "text-gray-700"
                      )}
                    >
                      {tab?.value}
                    </p>

                    {openIndex === index && (
                      <div className="absolute -bottom-4 z-[1] right-10">
                        <Image
                          src="/images/star.png"
                          alt="img"
                          width={30}
                          height={30}
                        />
                      </div>
                    )}
                  </button>
                )}

                {/* Animated Content */}
                {tab?.description && (
                  <div
                    className={clsx(
                      "transition-all duration-700 ease-in-out overflow-hidden",
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: tab?.description }}
                      className="p-5 text-[#0D2B3E] font-normal text-[14px] md:text-[16px] xl:text-[18px] leading-[154%] lg:leading-[160%] font-roboto"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default WhoPrinciples;
