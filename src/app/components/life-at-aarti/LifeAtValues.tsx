"use client";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { H2 } from "../Typography2";
import Image from "next/image";
import { LAAValueProps } from "@/app/types/life-at-aarti.type";
import { FadeInReveal } from "../ScrollReveal";

const LifeAtValues = ({ data2 }: LAAValueProps) => {
  const { title, data } = data2;
  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      if (data) {
        setActive((prevActive) => (prevActive + 1) % data.length);
      }
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Handle hover state
  useEffect(() => {
    if (isHovered) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }, [isHovered, data && data.length]);

  // Initial autoplay setup
  useEffect(() => {
    startAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data && data.length]);

  const handleTabClick = (index: number) => {
    setActive(index);
    // Restart autoplay after manual click
    if (!isHovered) {
      startAutoplay();
    }
  };

  return (
    <section className="max-w-5xl mx-auto md:py-[100px] pt-[0px] pb-[50px] ">
      {title && (
        <FadeInReveal>
        <H2 className="max-w-xl mx-[20px] lg:mx-auto text-center py-[unset] md:py-9">
          {title}
        </H2>
        </FadeInReveal>
      )}
      {/* Desktop Layout - Only renders if data exists and has valid content */}
      <FadeInReveal delay={0.6} className="w-full">
      {data &&
        data.length > 0 &&
        data.some((item) => item?.value || item?.description) && (
          <div
            className="hidden md:flex flex-row items-stretch overflow-hidden relative fluid-container !z-[10]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Left Tabs + Progress Bar */}
            <div className="relative bg-white text-white md:w-[40%] flex flex-col justify-center">
              <div className="relative flex gap-4">
                <div className="bg-[#f5f8fa] h-[100%] w-[30px] absolute right-0"/>
                {/* Progress Bar */}
                <div className="relative flex flex-col items-center justify-center">
                  {data.map((_, index) => (
                    <div
                      key={index}
                      className={`w-[3px] rounded-full transition-all duration-300 my-1 ${
                        index === active
                          ? "bg-amber-600 h-12"
                          : "bg-gray-300 h-7"
                      }`}
                    ></div>
                  ))}
                </div>
                {/* Tabs */}
                <div className="space-y-6 w-full bg-gradient-orange-1 p-8 rounded-2xl relative flex flex-col">
                  {data.map(
                    (tab, index) =>
                      tab?.value && (
                        <button
                          key={tab.id}
                          onClick={() => handleTabClick(index)}
                          className="relative"
                        >
                          <H2
                            className={clsx(
                              "block text-left transition-all duration-300 cursor-pointer z-[20] ",
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
              </div>
            </div>
            {/* Right Content */}
            <div className="bg-[#F5F8FA] text-[#0D2B3E] flex-1 p-12 flex items-center rounded-r-2xl">
              {data[active]?.description && (
                <div key={active}>
                  <div
                    className="font-normal text-[18px] md:text-[22px] xl:text-[24px] leading-[140%] text-blue-200 font-alte-hans"
                    dangerouslySetInnerHTML={{
                      __html: data[active]?.description,
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        </FadeInReveal>
      {/* Mobile Accordion */}
      <FadeInReveal delay={0.6} className="md:hidden mt-6 space-y-3 bg-[#F5F8FA] rounded-2xl fluid-container">
        {data?.map((tab, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={tab.id}
              className={clsx(
                `border-b border-gray-200 overflow-hidden transition-all duration-500 ease-in-out mx-[0px] lg:mx-[20px]`,
                data?.length - 1 === index && "border-b-0"
              )}
            >
              {/* Header Button */}
              {tab?.value && (
                <button
                  className={clsx(
                    "w-full text-left p-5 pt-2 rounded-2xl flex justify-between items-center transition-all duration-300 relative !z-[10] ",
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
                    className="font-normal text-[14px] md:text-[16px] xl:text-[18px] leading-[154%] lg:leading-[160%] font-roboto p-5 text-[#0D2B3E]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </FadeInReveal>
    </section>
  );
};

export default LifeAtValues;
